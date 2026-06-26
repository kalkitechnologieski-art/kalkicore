import { useState, useEffect } from 'react';
import { getSupabaseClient } from '@/lib/api/supabase';

export function useNodeCount(interval = 5000) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseClient();

    // Initial fetch
    const fetchCount = async () => {
      const { count: c, error } = await supabase
        .from('nodes')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active')
        .gte('last_seen', Date.now() - 60000);

      if (!error) setCount(c || 0);
      setLoading(false);
    };

    fetchCount();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('nodes-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'nodes' },
        () => {
          fetchCount(); // refresh on any change
        }
      )
      .subscribe();

    // Also poll periodically as fallback
    const timer = setInterval(fetchCount, interval);

    return () => {
      channel.unsubscribe();
      clearInterval(timer);
    };
  }, [interval]);

  return { count, loading };
}
