/**
 * @file visitor.ts
 * @package src/lib
 * @preview Read-only accessor for the anonymous visitor identifier.
 * The cookie itself is issued exclusively by the global middleware
 * (the only layer permitted to mutate cookies outside a Server Action
 * or Route Handler), so this helper never attempts to set it — doing
 * so during a Server Component render is what caused the 500 error.
 */

import { cookies } from "next/headers";

const VISITOR_COOKIE_NAME = "portfolio_visitor_id";

/**
 * Reads the visitor's anonymous identifier cookie.
 *
 * Returns null on a visitor's very first request, before the
 * middleware-issued cookie has reached the browser — callers must
 * treat that as "no prior interaction" rather than querying with a
 * null value.
 *
 * @function getVisitorId
 * @returns {Promise<string | null>} The visitor identifier, or null.
 */
export async function getVisitorId(): Promise<string | null> {
    const cookieStore = await cookies();

    return (
        cookieStore
            .get(VISITOR_COOKIE_NAME)
            ?.value ?? null
    );
}