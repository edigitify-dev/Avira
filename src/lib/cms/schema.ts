export const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS cms_insights (
    id uuid PRIMARY KEY,
    slug varchar(120) NOT NULL UNIQUE,
    draft jsonb NOT NULL,
    published jsonb,
    revision integer NOT NULL DEFAULT 1,
    updated_at timestamptz NOT NULL DEFAULT now(),
    published_at timestamptz
  )`,
  `CREATE TABLE IF NOT EXISTS cms_content_migrations (key varchar(80) PRIMARY KEY)`,
  `CREATE TABLE IF NOT EXISTS cms_website_content (
    id varchar(32) PRIMARY KEY,
    draft jsonb NOT NULL DEFAULT '{}'::jsonb,
    published jsonb NOT NULL DEFAULT '{}'::jsonb,
    revision integer NOT NULL DEFAULT 0,
    updated_at timestamptz,
    published_at timestamptz,
    updated_by varchar(64)
  )`,
  `INSERT INTO cms_website_content (id) VALUES ('website') ON CONFLICT (id) DO NOTHING`,
  `CREATE TABLE IF NOT EXISTS cms_enquiries (
    id uuid PRIMARY KEY,
    request_id uuid NOT NULL UNIQUE,
    name varchar(120) NOT NULL,
    email varchar(254) NOT NULL,
    organisation varchar(160) NOT NULL DEFAULT '',
    phone varchar(40) NOT NULL DEFAULT '',
    message varchar(500) NOT NULL,
    status varchar(16) NOT NULL DEFAULT 'new'
      CHECK (status IN ('new', 'read', 'replied', 'archived')),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS cms_enquiries_created_idx ON cms_enquiries (created_at DESC, id)`,
  `CREATE INDEX IF NOT EXISTS cms_enquiries_status_idx ON cms_enquiries (status, created_at DESC)`,
  `CREATE TABLE IF NOT EXISTS cms_admin_sessions (
    token_hash char(64) PRIMARY KEY,
    username varchar(64) NOT NULL,
    credential_fingerprint char(64) NOT NULL,
    expires_at timestamptz NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS cms_sessions_expiry_idx ON cms_admin_sessions (expires_at)`,
  `CREATE TABLE IF NOT EXISTS cms_rate_limits (
    key varchar(160) PRIMARY KEY,
    attempts integer NOT NULL,
    expires_at timestamptz NOT NULL
  )`,
];
