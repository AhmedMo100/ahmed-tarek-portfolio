/**
 * @file visitor.ts
 * @package src/lib
 * @description
 * Handles anonymous visitor identification through
 * a secure HTTP-only cookie.
 */

import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const VISITOR_COOKIE_NAME = "portfolio_visitor_id";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/**
 * Reads the existing visitor ID without modifying cookies.
 *
 * Safe to use during Server Component rendering.
 */
export async function getVisitorId(): Promise<string | null> {
    const cookieStore = await cookies();

    return (
        cookieStore.get(
            VISITOR_COOKIE_NAME,
        )?.value ?? null
    );
}

/**
 * Gets the existing visitor ID or creates a new one.
 *
 * This function should only be called from a
 * Server Action or Route Handler where cookie
 * mutation is allowed.
 */
export async function getOrCreateVisitorId(): Promise<string> {
    const cookieStore = await cookies();

    const existingVisitorId =
        cookieStore.get(
            VISITOR_COOKIE_NAME,
        )?.value;

    if (existingVisitorId) {
        return existingVisitorId;
    }

    const visitorId = randomUUID();

    cookieStore.set(
        VISITOR_COOKIE_NAME,
        visitorId,
        {
            httpOnly: true,
            secure:
                process.env.NODE_ENV ===
                "production",
            sameSite: "lax",
            maxAge: COOKIE_MAX_AGE,
            path: "/",
        },
    );

    return visitorId;
}