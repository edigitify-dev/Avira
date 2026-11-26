import "server-only";
import { neon } from "@neondatabase/serverless";
import { schemaStatements } from "./schema";

let schemaReady: Promise<void> | undefined;

export function databaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function database() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured");
  return neon(url);
}

export async function ensureSchema() {
  if (!schemaReady) {
    const sql = database();
    // Serialize first-request setup across routes and server instances.
    schemaReady = sql.transaction([
      sql`SELECT pg_advisory_xact_lock(hashtext('avira-cms-schema-v1'))`,
      ...schemaStatements.map(statement => sql.query(statement)),
    ]).then(() => undefined).catch(error => {
      schemaReady = undefined;
      throw error;
    });
  }
  await schemaReady;
}
