import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/lib/api/supabase';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, service, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and message are required' }),
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();
    const { error } = await supabase.from('leads').insert([
      { name, email, phone, service, message },
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to save lead' }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Lead saved successfully' }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Contact API error:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Internal server error' }),
      { status: 500 }
    );
  }
}
