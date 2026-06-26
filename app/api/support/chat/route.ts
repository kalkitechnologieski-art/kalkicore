import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages' }), { status: 400 });
    }

    // System prompt – make it friendly and brand‑aligned
    const systemMessage = {
      role: 'system',
      content: `You are KALKI SUPPORT, the friendly AI assistant for KALKI TECHNOLOGIES – the Temple of Technology. 
You are helpful, concise, and knowledgeable about AI, WebLLM, distributed inference, digital marketing, and web development. 
Keep responses under 3 sentences unless asked for details. Be warm and professional.`,
    };

    const response = await groq.chat.completions.create({
      model: 'mixtral-8x7b-32768', // Free tier model (or use llama3-70b-8192 if available)
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 150,
      stream: false,
    });

    const reply = response.choices[0]?.message?.content || 'I’m here to help!';

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Support API error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
