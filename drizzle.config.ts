require("dotenv").config();

import type { Config } from "drizzle-kit";

export default {
    schema: "./src/database/schema.ts",
    out: "./src/migrations",
    dialect: "turso",
    dbCredentials: {
        url: process.env.VITE_TURSO_DATABASE_URL!,
        authToken: process.env.VITE_TURSO_AUTH_TOKEN,
    },
} satisfies Config;
