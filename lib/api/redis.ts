import { Redis } from '@upstash/redis';

let client: Redis | null = null;

export function getRedisClient(): Redis {
  if (!client) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) {
      if (process.env.NODE_ENV === 'production') {
        console.warn('⚠️ Upstash Redis environment variables missing. Using dummy client.');
        // Dummy client that logs but doesn't throw
        client = new Redis({ url: url || 'https://dummy.upstash.io', token: token || 'dummy' });
      } else {
        throw new Error('Upstash Redis URL and token are required.');
      }
    } else {
      client = new Redis({ url, token });
    }
  }
  return client;
}

// For backward compatibility
export const redis = new Proxy({} as Redis, {
  get(_, prop) {
    const client = getRedisClient();
    const value = (client as any)[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});
