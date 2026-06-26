import { providers, getFastestProvider } from './providers';
export class InferenceRouter {
  async route(request: any) {
    return { id: 'mock', model: 'mock', text: 'Mock response', tokensUsed: { input: 0, output: 0 }, latency: 0 };
  }
}
