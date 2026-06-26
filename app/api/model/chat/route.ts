import { NextRequest } from 'next/server';
import { InferenceRouter } from '@/lib/ai/router';
export const runtime = 'edge';
export const maxDuration = 30;
export async function POST(req: NextRequest) {
  try {
    const { prompt, sessionId, userId } = await req.json();
    const router = new InferenceRouter();
    const result = await router.route({ userId: userId || 'anonymous', sessionId: sessionId || 'default', task: 'text', prompt, stream: true });
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        const tokens = (result.text || '').split(' ');
        for (const token of tokens) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token: token + ' ' })}\n\n`));
        }
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();
      },
    });
    return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' } });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
