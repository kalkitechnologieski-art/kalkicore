import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      // During build, return a dummy client that logs but doesn't throw
      if (process.env.NODE_ENV === 'production') {
        console.warn('⚠️ Supabase environment variables missing. Using dummy client.');
        // Create dummy client that will fail on actual calls
        client = createClient(url || 'https://dummy.supabase.co', key || 'dummy-key');
      } else {
        throw new Error('Supabase URL and anon key are required.');
      }
    } else {
      client = createClient(url, key);
    }
  }
  return client;
}

// For backward compatibility, export a proxy that calls getSupabaseClient()
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    const client = getSupabaseClient();
    const value = (client as any)[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});
