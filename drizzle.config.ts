import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './server/schema',
    out: './migrations',
    dialect: 'turso',
    dbCredentials: {
        url: process.env.NUXT_TURSO_DATABASE_URL!,
        authToken: process.env.NUXT_TURSO_AUTH_TOKEN!,
    },
});
