import { getSupabaseClient } from '@/lib/api/supabase';

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    // Count nodes that have been seen in the last 60 seconds
    const { count, error } = await supabase
      .from('nodes')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
      .gte('last_seen', oneMinuteAgo);

    if (error) {
      console.error('Supabase count error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to count nodes' }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ count: count || 0 }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Node count error:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Internal server error' }),
      { status: 500 }
    );
  }
}
