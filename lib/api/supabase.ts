import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error('Supabase environment variables are not set.');
    }
    client = createClient(url, key);
  }
  return client;
}

// For backward compatibility, export a proxied instance
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    const c = getSupabaseClient();
    const value = (c as any)[prop];
    if (typeof value === 'function') {
      return value.bind(c);
    }
    return value;
  },
});
