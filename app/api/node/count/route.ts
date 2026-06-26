import { NodeRegistry } from '@/lib/ai/nodeRegistry';
export async function GET() {
  const registry = new NodeRegistry();
  const nodes = await registry.getAvailableNodes();
  return new Response(JSON.stringify({ count: nodes.length }), { status: 200 });
}
