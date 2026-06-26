import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/lib/api/supabase';

export async function POST(req: NextRequest) {
  try {
    const { nodeId, type, capabilities, metrics } = await req.json();

    if (!nodeId) {
      return new Response(
        JSON.stringify({ error: 'nodeId is required' }),
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();
    const now = Date.now();

    // Upsert node
    const { error } = await supabase.from('nodes').upsert(
      {
        id: nodeId,
        type: type || 'browser',
        status: 'active',
        last_seen: now,
        capabilities: capabilities || {},
        metrics: metrics || {},
      },
      { onConflict: 'id' }
    );

    if (error) {
      console.error('Supabase upsert error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to update node' }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, last_seen: now }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Heartbeat error:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Internal server error' }),
      { status: 500 }
    );
  }
}
