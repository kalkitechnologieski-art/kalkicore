import { NextRequest } from 'next/server';
import { InferenceRouter } from '@/lib/ai/router';

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { prompt, sessionId, userId, useWebLLM } = await req.json();

    // If client requests WebLLM, return a flag as JSON
    if (useWebLLM) {
      return new Response(
        JSON.stringify({ type: 'webllm', prompt, sessionId, userId }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const router = new InferenceRouter();
    const result = await router.route({
      userId: userId || 'anonymous',
      sessionId: sessionId || 'default',
      task: 'text',
      prompt,
      stream: true,
    });

    // Create SSE stream
    const encoder = new TextEncoder();
    const words = (result.text || '').split(' ');
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
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500 }
    );
  }
}
