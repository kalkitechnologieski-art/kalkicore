import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import knowledge from '@/lib/content/knowledge-full.json';

// ------------------------------------------------------------
// 1. Initialize all providers
// ------------------------------------------------------------
const groq = process.env.GROQ_API_KEY
  ? new OpenAI({ baseURL: 'https://api.groq.com/openai/v1', apiKey: process.env.GROQ_API_KEY })
  : null;

const zhipu = process.env.ZHIPU_API_KEY
  ? new OpenAI({ baseURL: 'https://open.bigmodel.cn/api/paas/v4', apiKey: process.env.ZHIPU_API_KEY })
  : null;

const cerebras = process.env.CEREBRAS_API_KEY
  ? new OpenAI({ baseURL: 'https://api.cerebras.ai/v1', apiKey: process.env.CEREBRAS_API_KEY })
  : null;

// ------------------------------------------------------------
// 2. Build context‑aware prompts
// ------------------------------------------------------------
function buildKnowledgeContext(): string {
  let ctx = `Company: ${knowledge.brand.name} (MSME: ${knowledge.brand.msme}). `;
  ctx += `Mission: ${knowledge.brand.mission}. Ethics: ${knowledge.brand.ethics}. `;
  ctx += `Clients: ${knowledge.brand.clients}. Founded: ${knowledge.brand.founded}. `;
  ctx += `Services (${knowledge.services.length}+): `;
  ctx += knowledge.services.map(s => `${s.name} (${s.category}) – ${s.description}. ROI: ${s.outcome}`).join('; ');
  ctx += `. FAQs: ${knowledge.faqs.map(f => `Q:${f.question} A:${f.answer}`).join('; ')}.`;
  return ctx;
}

const KNOWLEDGE_CONTEXT = buildKnowledgeContext();

// ------------------------------------------------------------
// 3. System prompts
// ------------------------------------------------------------
function buildSupportSystemPrompt(): string {
  return `You are KALKI SUPPORT, a friendly, expert sales professional with 30+ years of experience.
You are chill, confident, and empathetic. You use real‑world examples.
Your goal: Understand the customer's pain point, suggest a relevant service from our offerings, and guide them to the contact form when ready.
Tone: Warm, conversational, professional.
Knowledge: ${KNOWLEDGE_CONTEXT}
When the user expresses interest, say: "${knowledge.contact_flow.message}"
Be concise but thorough. Use examples.`;
}

function buildKIBotSystemPrompt(): string {
  return `You are KALKI 6.0, the flagship AI model – intelligent, creative, unstoppable.
You answer anything, write scripts, teach, strategize, and suggest services if relevant.
Tone: Confident, inspirational, clear.
Knowledge: ${KNOWLEDGE_CONTEXT}
Greeting: "${knowledge.personas.ki_bot.greeting}"
Be detailed, use examples, and inspire.`;
}

const SUPPORT_SYSTEM_PROMPT = buildSupportSystemPrompt();
const KIBOT_SYSTEM_PROMPT = buildKIBotSystemPrompt();

// ------------------------------------------------------------
// 4. Main Router with parallel execution
// ------------------------------------------------------------
export class InferenceRouter {
  async route(prompt: string, userId: string = 'anonymous', botType: 'support' | 'kibot' = 'kibot'): Promise<{ text: string; provider: string }> {
    const systemPrompt = botType === 'support' ? SUPPORT_SYSTEM_PROMPT : KIBOT_SYSTEM_PROMPT;

    const providers = [];
    if (groq) providers.push({ name: 'groq', client: groq, model: 'mixtral-8x7b-32768' });
    if (zhipu) providers.push({ name: 'zhipu', client: zhipu, model: 'glm-4.5-flash' });
    if (cerebras) providers.push({ name: 'cerebras', client: cerebras, model: 'llama3.3-70b' });

    if (providers.length === 0) {
      return { text: 'No AI providers available. Please set GROQ_API_KEY, ZHIPU_API_KEY, or CEREBRAS_API_KEY.', provider: 'fallback' };
    }

    const calls = providers.map(async (p) => {
      try {
        const completion = await p.client.chat.completions.create({
          model: p.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 1024,
          stream: false,
        });
        const text = completion.choices[0]?.message?.content?.trim() || '';
        return { provider: p.name, text };
      } catch (err) {
        return { provider: p.name, text: '', error: String(err) };
      }
    });

    const results = await Promise.allSettled(calls);
    let selected = { provider: 'fallback', text: '' };
    for (const r of results) {
      if (r.status === 'fulfilled' && r.value.text) {
        selected = r.value;
        break;
      }
    }

    if (!selected.text) {
      return { text: 'I’m currently experiencing high demand. Please try again in a moment.', provider: 'fallback' };
    }

    return selected;
  }
}
