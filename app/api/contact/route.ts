import { NextRequest } from 'next/server';
import { supabase } from '@/lib/api/supabase';
export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  const { error } = await supabase.from('leads').insert({ name, email, message });
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
