import { Model, ModelTask } from './types';
export function selectModel(task: ModelTask, promptLength: number, availableModels: Model[], preference: 'speed' | 'quality' | 'cost' = 'speed'): Model | null {
  const filtered = availableModels.filter(m => m.task === task && m.maxTokens >= promptLength);
  if (!filtered.length) return null;
  const scored = filtered.map(m => ({ model: m, score: (preference === 'speed' ? 1 / (m.avgLatencyMs + 1) : 0) + (preference === 'quality' ? (m.size === 'large' ? 1 : 0) : 0) + (preference === 'cost' ? (m.costPerToken === undefined ? 1 : 0) : 0) }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.model || null;
}
