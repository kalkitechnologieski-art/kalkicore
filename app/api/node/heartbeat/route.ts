import { NextRequest } from 'next/server';
import { NodeRegistry } from '@/lib/ai/nodeRegistry';
export async function POST(req: NextRequest) {
  const { nodeId } = await req.json();
  const registry = new NodeRegistry();
  await registry.heartbeat(nodeId);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
