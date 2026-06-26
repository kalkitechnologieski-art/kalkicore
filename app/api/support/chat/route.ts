import { NextRequest } from 'next/server';
import { InferenceRouter } from '@/lib/ai/router';

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid messages' }), { status: 400 });
    }

    const lastUser = messages.filter((m: any) => m.role === 'user').pop();
    const prompt = lastUser?.content || 'Hello';

    const router = new InferenceRouter();
    const result = await router.route(prompt, 'support-user', 'support');

    return new Response(JSON.stringify({ reply: result.text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Support API error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), { status: 500 });
  }
}
