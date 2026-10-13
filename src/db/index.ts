import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "@/env";

const sql = neon(env.DATABASE_URL);

/** Type-safe Drizzle client backed by Neon Serverless HTTP. */
export const db = drizzle(sql);

/** Export the SQL client for focused health checks and transactions. */
export { sql };
