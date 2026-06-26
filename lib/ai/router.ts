import { ModelManager } from './modelManager';
import { TokenManager } from './tokenManager';
import { NodeRegistry } from './nodeRegistry';
import { InferenceRequest, InferenceResponse } from './types';
import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import knowledge from '@/lib/content/knowledge.json';

// ============================================================
// 1. Initialize Groq Client (Primary)
// ============================================================
const groq = process.env.GROQ_API_KEY
  ? new OpenAI({
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey: process.env.GROQ_API_KEY,
    })
  : null;

// ============================================================
// 2. Initialize Zhipu Client (Secondary – FREE tier)
// ============================================================
const zhipu = process.env.ZHIPU_API_KEY
  ? new OpenAI({
      baseURL: 'https://open.bigmodel.cn/api/paas/v4',
      apiKey: process.env.ZHIPU_API_KEY,
    })
  : null;

// ============================================================
// 3. System Prompt from Knowledge Base
// ============================================================
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

// ============================================================
// 4. Usage Tracker for Free Tier Quotas
// ============================================================
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

// ============================================================
// 5. Main Router Class
// ============================================================
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

    // 1. Check user quota
    const hasQuota = await this.tokenManager.checkQuota(request.userId);
    if (!hasQuota) {
      throw new Error('Daily quota exceeded. Please try again tomorrow.');
    }

    // 2. Build provider list with quota checks
    const providers: { name: string; call: () => Promise<ModelResponse> }[] = [];

    // Groq (priority 1)
    if (groq && checkQuota('groq', 50)) {
      providers.push({ name: 'groq', call: () => this.callGroq(request.prompt) });
    }

    // Zhipu (priority 2 – free tier)
    if (zhipu && checkQuota('zhipu', 100)) {
      providers.push({ name: 'zhipu', call: () => this.callZhipu(request.prompt) });
    }

    // Fallback: if no providers available
    if (providers.length === 0) {
      // Try Zhipu even if quota says no
      if (zhipu) {
        providers.push({ name: 'zhipu', call: () => this.callZhipu(request.prompt) });
      } else if (groq) {
        providers.push({ name: 'groq', call: () => this.callGroq(request.prompt) });
      } else {
        throw new Error('No AI providers available. Please set GROQ_API_KEY or ZHIPU_API_KEY.');
      }
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

    // 4. Select best response (prefer Groq, then Zhipu)
    const providerPriority = ['groq', 'zhipu'];
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

  // ============================================================
  // 6. Groq Provider
  // ============================================================
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
      if (!text.trim()) {
        throw new Error('Empty response from Groq');
      }
      return { provider: 'groq', text, latency: Date.now() - start };
    } catch (error: any) {
      throw new Error(`Groq error: ${error.message}`);
    }
  }

  // ============================================================
  // 7. Zhipu Provider (GLM-4.5-Flash – FREE tier)
  // ============================================================
  private async callZhipu(prompt: string): Promise<ModelResponse> {
    if (!zhipu) throw new Error('Zhipu client not initialized');
    const start = Date.now();

    try {
      // GLM-4.5-Flash is the free tier model
      const completion = await zhipu.chat.completions.create({
        model: 'glm-4.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1024,
        stream: false,
        // Zhipu-specific: add thinking parameter if needed
        // but the OpenAI client doesn't support it directly.
        // We'll add it as an extra body parameter using the `extra_body` option.
      });

      let text = completion.choices[0]?.message?.content || '';
      if (!text.trim()) {
        // If empty, try without thinking (if we can set thinking: disabled)
        // but with OpenAI client we can't easily set that.
        // So we'll just fallback to Groq.
        throw new Error('Empty response from Zhipu');
      }

      return { provider: 'zhipu', text, latency: Date.now() - start };
    } catch (error: any) {
      // If Zhipu fails, we'll let the caller handle it (fallback to Groq)
      throw new Error(`Zhipu error: ${error.message}`);
    }
  }
}
