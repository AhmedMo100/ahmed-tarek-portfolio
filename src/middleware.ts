/**
 * @file middleware.ts
 * @package src
 * @description
 * Global Next.js routing middleware utilizing next-intl
 * to enforce localized routing and issue a persistent
 * anonymous visitor identifier cookie.
 */

import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

/**
 * Localized routing middleware instance.
 */
const intlMiddleware =
    createMiddleware(routing);

const VISITOR_COOKIE_NAME =
    "portfolio_visitor_id";

const VISITOR_COOKIE_MAX_AGE =
    60 * 60 * 24 * 365; // 1 year

/**
 * Creates a UUID using the Web Crypto API,
 * which is supported by the Edge Runtime.
 */
function createVisitorId(): string {
    return crypto.randomUUID();
}

/**
 * Wraps next-intl middleware and guarantees
 * that every visitor receives a stable anonymous
 * identifier cookie.
 */
export default function middleware(
    request: NextRequest,
): NextResponse {
    const response =
        intlMiddleware(request);

    if (
        !request.cookies.get(
            VISITOR_COOKIE_NAME,
        )
    ) {
        response.cookies.set(
            VISITOR_COOKIE_NAME,
            createVisitorId(),
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV ===
                    "production",
                sameSite: "lax",
                maxAge:
                    VISITOR_COOKIE_MAX_AGE,
                path: "/",
            },
        );
    }

    return response;
}

/**
 * Server-level optimization matcher configuration.
 */
export const config = {
    matcher: [
        "/",
        "/(ar|en)/:path*",
        "/((?!api|_next|_vercel|.*\\..*).*)",
    ],
};