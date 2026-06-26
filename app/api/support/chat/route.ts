import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';
import knowledge from '@/lib/content/knowledge.json';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' });

export const runtime = 'edge';
export const maxDuration = 30;

function buildSupportSystemPrompt(): string {
  let prompt = `You are KALKI SUPPORT, the friendly AI assistant for KALKI TECHNOLOGIES – the Temple of Technology. 
Use this knowledge to answer questions:
- Brand: ${knowledge.brand.name}, mission: ${knowledge.brand.mission}
- Products: KI Bot (fastest chatbot), KI Cloud (community), 212+ services.
- Pricing: Starter ₹4,999/mo, Pro ₹9,999/mo, Enterprise custom.
- FAQs: ${knowledge.faqs.map(f => `${f.question}: ${f.answer}`).join('; ')}
Keep responses under 3 sentences. Be warm and professional.`;
  return prompt;
}

const SYSTEM_PROMPT = buildSupportSystemPrompt();

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages' }), { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: 'mixtral-8x7b-32768',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 150,
      stream: false,
    });

    const reply = completion.choices[0]?.message?.content || 'I’m here to help!';
    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Support API error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
