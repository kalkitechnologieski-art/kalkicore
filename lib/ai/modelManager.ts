import { Model, ModelTask, Node } from './types';
export class ModelManager {
  private registry = new Map<string, Model>();
  constructor() {
    this.register({ id: 'smollm2-135m', name: 'SmolLM2 135M', provider: 'browser', task: 'text', size: 'tiny', avgLatencyMs: 30, maxTokens: 4096, capabilities: ['chat', 'completion'] });
    this.register({ id: 'llama3-70b', name: 'Llama 3 70B', provider: 'cloud', task: 'text', size: 'large', avgLatencyMs: 200, costPerToken: 0.000002, maxTokens: 8192, capabilities: ['chat', 'reasoning', 'code'] });
  }
  register(model: Model) { this.registry.set(model.id, model); }
  getModel(id: string) { return this.registry.get(id); }
  listModels(task?: ModelTask) {
    const all = Array.from(this.registry.values());
    return task ? all.filter(m => m.task === task) : all;
  }
  selectBestModel(task: ModelTask, availableNodes: Node[], budget: number = 0.01): Model | null {
    const candidates = this.listModels(task).filter(m => m.costPerToken === undefined || m.costPerToken * 1000 < budget);
    candidates.sort((a, b) => (a.costPerToken ?? 0) - (b.costPerToken ?? 0) || a.avgLatencyMs - b.avgLatencyMs);
    return candidates[0] || null;
  }
}
