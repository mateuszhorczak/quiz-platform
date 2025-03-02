import { drizzle } from 'drizzle-orm/libsql/web';
import { createClient } from '@libsql/client/web';
import * as schema from "./schema";

const client = createClient({
    url: process.env.NUXT_TURSO_DATABASE_URL!,
    authToken: process.env.NUXT_TURSO_AUTH_TOKEN!
});

export const db = drizzle({ client, schema });
