/**
 * @file prisma.ts
 * @preview Configures and exports a single, global Edge-ready PrismaClient instance integrated with PgPool.
 */

import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

/**
 * Global interface augmentation to prevent duplicate Prisma connections during Next.js Hot Module Replacement (HMR).
 */
const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
};

/**
 * Highly scalable PostgreSQL connection pool initialization.
 */
console.log(process.env.DATABASE_URL);
console.log(typeof process.env.DATABASE_URL);
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

/**
 * Initialize the Prisma serverless/edge-ready database driver adapter.
 */
const adapter = new PrismaPg(pool);

/**
 * Cached or newly instantiated PrismaClient instance targeting PostgreSQL.
 * @type {PrismaClient}
 */
const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
    });

// Retain active reference across development re-renders
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export default prisma;