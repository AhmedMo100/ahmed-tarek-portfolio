
/**
 * @file middleware.ts
 * @package src
 * @preview
 * Global Next.js middleware combining next-intl localization
 * with anonymous visitor identification.
 */

import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";

const VISITOR_COOKIE_NAME = "portfolio_visitor_id";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Localized routing middleware.
 */
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const response = intlMiddleware(request);

    /**
     * Create an anonymous visitor identifier once.
     *
     * Cookie mutation is performed here because middleware
     * is allowed to modify response cookies.
     */
    if (!request.cookies.get(VISITOR_COOKIE_NAME)) {
        const visitorId = crypto.randomUUID();

        response.cookies.set(
            VISITOR_COOKIE_NAME,
            visitorId,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: COOKIE_MAX_AGE,
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
