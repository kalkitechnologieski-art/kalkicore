-- Supabase schema for Kalki 6.0
CREATE TABLE IF NOT EXISTS users ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email TEXT UNIQUE NOT NULL, role TEXT DEFAULT 'customer', tier TEXT DEFAULT 'free', created_at TIMESTAMPTZ DEFAULT NOW() );
CREATE TABLE IF NOT EXISTS token_usage ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id) ON DELETE CASCADE, session_id TEXT, provider TEXT, model TEXT, input_tokens INT, output_tokens INT, total_tokens INT, cost DECIMAL(10,6), timestamp TIMESTAMPTZ DEFAULT NOW() );
CREATE TABLE IF NOT EXISTS leads ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT, email TEXT, message TEXT, created_at TIMESTAMPTZ DEFAULT NOW() );
CREATE TABLE IF NOT EXISTS nodes ( id TEXT PRIMARY KEY, type TEXT, status TEXT, last_seen BIGINT, capabilities JSONB, metrics JSONB );
ALTER TABLE token_usage ENABLE ROW LEVEL SECURITY; ALTER TABLE leads ENABLE ROW LEVEL SECURITY; ALTER TABLE nodes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read for all" ON nodes FOR SELECT USING (true); CREATE POLICY "Enable insert for all" ON nodes FOR INSERT WITH CHECK (true);
CREATE INDEX idx_token_usage_user ON token_usage(user_id); CREATE INDEX idx_token_usage_timestamp ON token_usage(timestamp); CREATE INDEX idx_nodes_last_seen ON nodes(last_seen);
