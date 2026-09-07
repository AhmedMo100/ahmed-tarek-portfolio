/**
 * @file middleware.ts
 * @package src
 * @preview Global Next.js routing middleware utilizing next-intl to intercept incoming 
 * requests and enforce strict localization prefixing strategies. Also issues a
 * persistent anonymous visitor identifier cookie on first visit, since cookie
 * mutation is only permitted here (or in a Server Action/Route Handler) —
 * never during Server Component rendering.
 */

import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { randomUUID } from "crypto";
import { routing } from "./i18n/routing";

/**
 * Localized routing middleware instance pre-configured with project i18n rules.
 */
const intlMiddleware = createMiddleware(routing);

const VISITOR_COOKIE_NAME = "portfolio_visitor_id";
const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/**
 * Wraps the localized routing middleware to also guarantee every visitor
 * carries a stable anonymous identifier, used to attribute likes and
 * comments without requiring authentication.
 *
 * @function middleware
 * @param {NextRequest} request - Incoming request context.
 * @returns {NextResponse} The localized response, with the visitor cookie
 * attached on first visit.
 */
export default function middleware(request: NextRequest): NextResponse {
    const response = intlMiddleware(request);

    if (!request.cookies.get(VISITOR_COOKIE_NAME)) {
        response.cookies.set(VISITOR_COOKIE_NAME, randomUUID(), {
            httpOnly: true,
            sameSite: "lax",
            maxAge: VISITOR_COOKIE_MAX_AGE,
        });
    }

    return response;
}

/**
 * Server-level optimization matcher configuration.
 * Excludes internal Next.js assets, static files, and API routes from middleware execution to maximize speed.
 */
export const config = {
    // Match only internationalized pathnames
    matcher: [
        // Match the root URL
        "/",

        // Match all pathnames starting with supported locales (/en, /ar)
        "/(ar|en)/:path*",

        // Enable redirection for non-prefixed catch-all routes (except static system files)
        "/((?!api|_next|_vercel|.*\\..*).*)",
    ],
};