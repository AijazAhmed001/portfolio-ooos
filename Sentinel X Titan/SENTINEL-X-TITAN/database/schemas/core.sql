CREATE TABLE IF NOT EXISTS incidents (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  severity TEXT NOT NULL,
  status TEXT NOT NULL,
  risk_score INTEGER NOT NULL,
  confidence INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS evidence (
  id TEXT PRIMARY KEY,
  incident_id TEXT NOT NULL,
  source_machine TEXT NOT NULL,
  artifact_type TEXT NOT NULL,
  sha256 TEXT NOT NULL,
  collected_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
