import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import knowledge from '@/lib/content/knowledge.json';

// ============================================================
// 1. Initialize Providers (OpenAI-compatible clients)
// ============================================================
const groq = process.env.GROQ_API_KEY
  ? new OpenAI({
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey: process.env.GROQ_API_KEY,
    })
  : null;

const zhipu = process.env.ZHIPU_API_KEY
  ? new OpenAI({
      baseURL: 'https://open.bigmodel.cn/api/paas/v4',
      apiKey: process.env.ZHIPU_API_KEY,
    })
  : null;

// ============================================================
// 2. Build System Prompt
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
// 3. Simple token usage tracker (for demonstration)
// ============================================================
// In production, use Supabase or Redis.
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

// ============================================================
// 4. Main Router
// ============================================================
export class InferenceRouter {
  async route(prompt: string, userId: string = 'anonymous'): Promise<{ text: string; provider: string }> {
    // Try Groq first
    if (groq && checkQuota('groq', 50)) {
      try {
        const text = await this.callProvider(groq, prompt);
        return { text, provider: 'groq' };
      } catch (error) {
        console.warn('Groq failed:', error);
      }
    }

    // Fallback to Zhipu
    if (zhipu && checkQuota('zhipu', 100)) {
      try {
        const text = await this.callProvider(zhipu, prompt);
        return { text, provider: 'zhipu' };
      } catch (error) {
        console.warn('Zhipu failed:', error);
      }
    }

    // Final fallback – default message
    return {
      text: 'I’m currently experiencing high demand. Please try again in a moment.',
      provider: 'fallback',
    };
  }

  private async callProvider(client: OpenAI, prompt: string): Promise<string> {
    const completion = await client.chat.completions.create({
      model: client.baseURL?.includes('groq')
        ? 'mixtral-8x7b-32768'
        : 'glm-4.5-flash',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1024,
      stream: false,
    });

    const text = completion.choices[0]?.message?.content?.trim() || '';
    if (!text) throw new Error('Empty response');
    return text;
  }
}
