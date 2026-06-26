import { NextRequest } from 'next/server';
import { InferenceRouter } from '@/lib/ai/router';

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { prompt, userId } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid prompt' }), { status: 400 });
    }

    const router = new InferenceRouter();
    const result = await router.route(prompt, userId || 'anonymous');

    const encoder = new TextEncoder();
    const words = result.text.split(' ');

    // Build a streaming response (simulate tokens)
    const stream = new ReadableStream({
      start(controller) {
        for (let i = 0; i < words.length; i++) {
          const token = words[i] + (i < words.length - 1 ? ' ' : '');
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`));
        }
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), { status: 500 });
  }
}
