-- ============================================================
-- KALKI 6.0 – Supabase Schema & Realtime
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------
-- 1. USERS TABLE
-- ---------------------------
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------
-- 2. LEADS TABLE (Contact Form)
-- ---------------------------
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------
-- 3. NODES TABLE (Distributed Network)
-- ---------------------------
CREATE TABLE IF NOT EXISTS nodes (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('browser', 'cloud', 'specialised')),
  status TEXT NOT NULL CHECK (status IN ('active', 'idle', 'offline')),
  last_seen BIGINT NOT NULL,
  capabilities JSONB,
  metrics JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------
-- 4. TOKEN_USAGE TABLE (Inference Logging)
-- ---------------------------
CREATE TABLE IF NOT EXISTS token_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  session_id TEXT,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  input_tokens INT NOT NULL,
  output_tokens INT NOT NULL,
  total_tokens INT NOT NULL,
  cost DECIMAL(10,6) DEFAULT 0,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------
-- Indexes for Performance
-- ---------------------------
CREATE INDEX IF NOT EXISTS idx_nodes_last_seen ON nodes(last_seen);
CREATE INDEX IF NOT EXISTS idx_nodes_status ON nodes(status);
CREATE INDEX IF NOT EXISTS idx_token_usage_user ON token_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_token_usage_timestamp ON token_usage(timestamp);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- ---------------------------
-- RLS Policies
-- ---------------------------
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_usage ENABLE ROW LEVEL SECURITY;

-- Users: only authenticated users can read their own data (or public read)
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Leads: public insert, authenticated read
CREATE POLICY "Public insert leads" ON leads
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated read leads" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');

-- Nodes: public read/write (for node registration)
CREATE POLICY "Public read nodes" ON nodes
  FOR SELECT USING (true);
CREATE POLICY "Public insert nodes" ON nodes
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update nodes" ON nodes
  FOR UPDATE USING (true);

-- Token usage: insert only (no read for public)
CREATE POLICY "Public insert token_usage" ON token_usage
  FOR INSERT WITH CHECK (true);
-- Authenticated users can read their own usage
CREATE POLICY "Users read own usage" ON token_usage
  FOR SELECT USING (auth.uid() = user_id);

-- ---------------------------
-- Realtime Subscriptions
-- ---------------------------
-- Enable realtime for nodes (for live node count)
ALTER TABLE nodes REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE nodes;

-- Optionally enable for leads if you want live lead notifications
-- ALTER PUBLICATION supabase_realtime ADD TABLE leads;

-- ---------------------------
-- Functions & Triggers
-- ---------------------------
-- Function to clean old nodes (offline > 1 hour)
CREATE OR REPLACE FUNCTION cleanup_old_nodes()
RETURNS void AS $$
BEGIN
  DELETE FROM nodes
  WHERE last_seen < (EXTRACT(EPOCH FROM NOW()) * 1000 - 3600000);
  RAISE NOTICE 'Deleted stale nodes (older than 1 hour)';
END;
$$ LANGUAGE plpgsql;

-- You can run cleanup manually or schedule with pg_cron:
-- SELECT cron.schedule('cleanup_nodes', '*/30 * * * *', 'SELECT cleanup_old_nodes();');
