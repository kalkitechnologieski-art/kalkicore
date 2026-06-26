export type ModelTask = 'text' | 'image' | 'video' | 'ocr';
export interface Model {
  id: string; name: string; provider: 'browser' | 'cloud' | 'external'; task: ModelTask;
  size: 'tiny' | 'small' | 'medium' | 'large'; quantization?: string; avgLatencyMs: number;
  costPerToken?: number; maxTokens: number; capabilities: string[];
}
export interface Node {
  id: string; type: 'browser' | 'cloud' | 'specialised'; status: 'active' | 'idle' | 'offline';
  lastSeen: number; capabilities: { models: string[]; maxTokens: number; avgLatency: number };
  metrics?: { cpu?: number; memory?: number; benchmark?: number };
}
export interface TokenUsage {
  userId: string; sessionId: string; provider: string; model: string;
  inputTokens: number; outputTokens: number; totalTokens: number; cost: number; timestamp: number;
}
export interface InferenceRequest {
  userId: string; sessionId: string; modelId?: string; task: ModelTask;
  prompt: string; maxTokens?: number; temperature?: number; stream?: boolean;
}
export interface InferenceResponse {
  id: string; model: string; text?: string; image?: string; video?: string;
  tokensUsed: { input: number; output: number }; latency: number;
}
