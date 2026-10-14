import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { getEnv } from "@/env";

type Database = ReturnType<typeof drizzle>;

type SqlClient = ReturnType<typeof neon>;

let database: Database | undefined;
let sqlClient: SqlClient | undefined;

function getSqlClient(): SqlClient {
  sqlClient ??= neon(getEnv().DATABASE_URL);
  return sqlClient;
}

export function getDb(): Database {
  database ??= drizzle(getSqlClient());
  return database;
}

/** Type-safe Drizzle client initialized only when a server request uses it. */
export const db = new Proxy({} as Database, {
  get(_target, property, receiver) {
    const value = Reflect.get(getDb(), property, receiver);
    return typeof value === "function" ? value.bind(getDb()) : value;
  },
});

/** Export the SQL client through a lazy accessor for health checks and transactions. */
export { getSqlClient as sql };
