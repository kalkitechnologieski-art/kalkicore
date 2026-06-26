import { ModelManager } from './modelManager';
import { TokenManager } from './tokenManager';
import { NodeRegistry } from './nodeRegistry';
import { InferenceRequest, InferenceResponse } from './types';
import { v4 as uuidv4 } from 'uuid';
import Groq from 'groq-sdk';
import OpenAI from 'openai';
import knowledge from '@/lib/content/knowledge.json';

// Initialize clients (with fallback to no-op)
const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

const zhipu = process.env.ZHIPU_API_KEY
  ? new OpenAI({ baseURL: 'https://open.bigmodel.cn/api/paas/v4', apiKey: process.env.ZHIPU_API_KEY })
  : null;

const cerebras = process.env.CEREBRAS_API_KEY
  ? new OpenAI({ baseURL: 'https://api.cerebras.ai/v1', apiKey: process.env.CEREBRAS_API_KEY })
  : null;

// Build system prompt from knowledge base
function buildSystemPrompt(): string {
  let prompt = 'You are KALKI AI, the intelligent assistant for KALKI TECHNOLOGIES – the Temple of Technology. ';
  prompt += `Mission: ${knowledge.brand.mission}. Vision: ${knowledge.brand.vision}. `;
  prompt += `Products: KI Bot (fastest AI chatbot), KI Cloud (community hub), 212+ services. `;
  prompt += `Pricing: Starter ₹4,999/mo, Pro ₹9,999/mo, Enterprise custom. `;
  prompt += 'Be helpful, concise, and friendly. Keep responses under 3 sentences unless asked for details. ';
  prompt += 'If you don’t know, say so.';
  return prompt;
}

const SYSTEM_PROMPT = buildSystemPrompt();

// Track provider usage to enforce free tier quotas
// In production, use Redis to track per user/day.
const usageTracker: Record<string, { count: number; resetTime: number }> = {};

function checkQuota(provider: string, limit: number = 100): boolean {
  const now = Date.now();
  const key = provider;
  if (!usageTracker[key]) {
    usageTracker[key] = { count: 0, resetTime: now + 24 * 60 * 60 * 1000 };
    return true;
  }
  const entry = usageTracker[key];
  if (now > entry.resetTime) {
    entry.count = 0;
    entry.resetTime = now + 24 * 60 * 60 * 1000;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

interface ModelResponse {
  provider: string;
  text: string;
  latency: number;
  error?: string;
}

export class InferenceRouter {
  private modelManager: ModelManager;
  private tokenManager: TokenManager;
  private nodeRegistry: NodeRegistry;

  constructor() {
    this.modelManager = new ModelManager();
    this.tokenManager = new TokenManager();
    this.nodeRegistry = new NodeRegistry();
  }

  async route(request: InferenceRequest): Promise<InferenceResponse> {
    const start = Date.now();

    // 1. Check user quota (from DB)
    const hasQuota = await this.tokenManager.checkQuota(request.userId);
    if (!hasQuota) throw new Error('Quota exceeded (daily limit).');

    // 2. Build the provider list, respecting quotas and availability.
    const providers: { name: string; call: () => Promise<ModelResponse> }[] = [];

    if (groq && checkQuota('groq', 50)) {
      providers.push({ name: 'groq', call: () => this.callGroq(request.prompt) });
    }
    if (zhipu && checkQuota('zhipu', 30)) {
      providers.push({ name: 'zhipu', call: () => this.callZhipu(request.prompt) });
    }
    if (cerebras && checkQuota('cerebras', 20)) {
      providers.push({ name: 'cerebras', call: () => this.callCerebras(request.prompt) });
    }

    // Fallback: if no providers available, throw a clear error.
    if (providers.length === 0) {
      throw new Error('All AI providers are currently over quota or unavailable. Please try again later.');
    }

    // 3. Execute all providers in parallel
    const results = await Promise.allSettled(providers.map(p => p.call()));

    const responses: ModelResponse[] = [];
    const errors: string[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        responses.push(result.value);
      } else {
        errors.push(`${providers[index].name}: ${result.reason}`);
      }
    });

    if (responses.length === 0) {
      throw new Error(`All providers failed: ${errors.join('; ')}`);
    }

    // 4. Select the best response (prefer Groq, then Zhipu, then Cerebras)
    // Simple priority ordering.
    const providerPriority = ['groq', 'zhipu', 'cerebras'];
    let selected = responses[0];
    for (const name of providerPriority) {
      const found = responses.find(r => r.provider === name);
      if (found) { selected = found; break; }
    }

    const latency = Date.now() - start;

    // 5. Log usage
    await this.tokenManager.logUsage({
      userId: request.userId,
      sessionId: request.sessionId,
      provider: selected.provider,
      model: 'kalki-6.0-ensemble',
      inputTokens: Math.ceil(request.prompt.length / 4),
      outputTokens: Math.ceil(selected.text.length / 4),
      totalTokens: Math.ceil((request.prompt.length + selected.text.length) / 4),
      cost: 0.000001 * (request.prompt.length + selected.text.length) / 1e6,
      timestamp: Date.now(),
    });

    return {
      id: uuidv4(),
      model: 'kalki-6.0-ensemble',
      text: selected.text,
      tokensUsed: {
        input: Math.ceil(request.prompt.length / 4),
        output: Math.ceil(selected.text.length / 4),
      },
      latency,
    };
  }

  // ---- Provider call wrappers ----

  private async callGroq(prompt: string): Promise<ModelResponse> {
    if (!groq) throw new Error('Groq client not initialized');
    const start = Date.now();
    try {
      const completion = await groq.chat.completions.create({
        model: 'mixtral-8x7b-32768',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1024,
        stream: false,
      });
      const text = completion.choices[0]?.message?.content || '';
      return { provider: 'groq', text, latency: Date.now() - start };
    } catch (error: any) {
      throw new Error(`Groq error: ${error.message}`);
    }
  }

  private async callZhipu(prompt: string): Promise<ModelResponse> {
    if (!zhipu) throw new Error('Zhipu client not initialized');
    const start = Date.now();
    try {
      const completion = await zhipu.chat.completions.create({
        model: 'glm-4.7-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1024,
        stream: false,
      });
      const text = completion.choices[0]?.message?.content || '';
      return { provider: 'zhipu', text, latency: Date.now() - start };
    } catch (error: any) {
      throw new Error(`Zhipu error: ${error.message}`);
    }
  }

  private async callCerebras(prompt: string): Promise<ModelResponse> {
    if (!cerebras) throw new Error('Cerebras client not initialized');
    const start = Date.now();
    try {
      const completion = await cerebras.chat.completions.create({
        model: 'llama3.3-70b',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1024,
        stream: false,
      });
      const text = completion.choices[0]?.message?.content || '';
      return { provider: 'cerebras', text, latency: Date.now() - start };
    } catch (error: any) {
      throw new Error(`Cerebras error: ${error.message}`);
    }
  }
}
