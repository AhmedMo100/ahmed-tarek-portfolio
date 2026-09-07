/**
 * @file middleware.ts
 * @package src
 * @preview Global Next.js routing middleware utilizing next-intl to intercept incoming 
 * requests and enforce strict localization prefixing strategies.
 */

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Localized routing middleware instance pre-configured with project i18n rules.
 */
export default createMiddleware(routing);

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
        "/((?!api|_next|_vercel|.*\\..*).*)"
    ]
};