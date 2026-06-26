export interface Provider {
  id: string;
  name: string;
  type: 'browser' | 'cloud' | 'external';
  priority: number;
  models: string[];
  free?: boolean;
  rateLimit?: number;
  baseURL?: string;
  apiKeyRequired?: boolean;
}

export const providers: Provider[] = [
  { id: 'webllm', name: 'WebLLM (Browser)', type: 'browser', priority: 1, models: ['SmolLM2-135M', 'Phi-3-mini'], free: true },
  { id: 'vllm', name: 'KALKI Cloud', type: 'cloud', priority: 2, models: ['Llama-3-70B', 'Qwen-72B'] },
  { id: 'grok', name: 'Grok (xAI)', type: 'external', priority: 3, models: ['grok-4.3'], free: true, baseURL: 'https://api.x.ai/v1', apiKeyRequired: true },
  { id: 'zhipu', name: 'Zhipu AI', type: 'external', priority: 4, models: ['glm-4.7-flash'], free: true, rateLimit: 1000, baseURL: 'https://open.bigmodel.cn/api/paas/v4', apiKeyRequired: true },
  { id: 'cerebras', name: 'Cerebras', type: 'external', priority: 5, models: ['llama3.3-70b'], free: true, baseURL: 'https://api.cerebras.ai/v1', apiKeyRequired: true },
  { id: 'openrouter', name: 'OpenRouter', type: 'external', priority: 6, models: ['meta-llama/llama-3-70b-instruct'], baseURL: 'https://openrouter.ai/api/v1', apiKeyRequired: true },
];
export function getFastestProvider(): Provider { return providers[0]; }
