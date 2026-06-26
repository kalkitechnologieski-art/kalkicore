import { Node } from './types';
import { getRedisClient } from '@/lib/api/redis';

export class NodeRegistry {
  private NODE_KEY = 'nodes';
  private get redis() {
    return getRedisClient();
  }

  async registerNode(node: Node): Promise<void> {
    await this.redis.hset(this.NODE_KEY, { [node.id]: JSON.stringify(node) });
    await this.redis.expire(this.NODE_KEY, 60);
  }

  async heartbeat(nodeId: string): Promise<void> {
    const node = await this.getNode(nodeId);
    if (node) {
      node.lastSeen = Date.now();
      node.status = 'active';
      await this.registerNode(node);
    }
  }

  async getNode(id: string): Promise<Node | undefined> {
    const data = await this.redis.hget(this.NODE_KEY, id);
    if (typeof data === 'string') {
      try {
        return JSON.parse(data) as Node;
      } catch (_) {
        return undefined;
      }
    }
    return undefined;
  }

  async getAvailableNodes(): Promise<Node[]> {
    const all = await this.redis.hgetall(this.NODE_KEY);
    const nodes: Node[] = [];
    if (!all || typeof all !== 'object') return nodes;
    for (const key of Object.keys(all)) {
      const value = all[key];
      if (typeof value === 'string') {
        try {
          const node = JSON.parse(value) as Node;
          if (node.status === 'active' && (Date.now() - node.lastSeen) < 30000) {
            nodes.push(node);
          }
        } catch (_) { /* ignore */ }
      }
    }
    return nodes;
  }
}
