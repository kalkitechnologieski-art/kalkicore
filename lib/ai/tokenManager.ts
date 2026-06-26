import { TokenUsage } from './types';
import { getSupabaseClient } from '@/lib/api/supabase';

export class TokenManager {
  private limits = {
    free: { daily: 10000, monthly: 300000 },
    pro: { daily: 100000, monthly: 3000000 },
    enterprise: { daily: 1000000, monthly: 30000000 },
  };

  async checkQuota(userId: string, tier: 'free' | 'pro' | 'enterprise' = 'free'): Promise<boolean> {
    const supabase = getSupabaseClient();
    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from('token_usage')
      .select('total_tokens')
      .eq('user_id', userId)
      .gte('timestamp', today)
      .maybeSingle();
    const used = data?.total_tokens ?? 0;
    return used < this.limits[tier].daily;
  }

  async logUsage(usage: TokenUsage): Promise<void> {
    const supabase = getSupabaseClient();
    await supabase.from('token_usage').insert({
      user_id: usage.userId,
      session_id: usage.sessionId,
      provider: usage.provider,
      model: usage.model,
      input_tokens: usage.inputTokens,
      output_tokens: usage.outputTokens,
      total_tokens: usage.totalTokens,
      cost: usage.cost,
      timestamp: new Date(usage.timestamp),
    });
  }
}
