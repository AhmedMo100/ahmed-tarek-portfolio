/**
 * @file request.ts
 * @package src/i18n
 * @preview Request-scoped translation bundle loader for next-intl. Dynamically imports 
 * the static JSON dictionaries on the server side based on the active routing locale.
 */

import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * Server-side asynchronous request configuration factory.
 * Resolves the incoming routing locale and attaches the corresponding language messages.
 */
export default getRequestConfig(async ({ requestLocale }) => {
    // Await the asynchronous request locale token provided by the router pipeline
    let locale = await requestLocale;

    // Structural Fallback: Validate that the incoming locale is officially supported
    if (!locale || !routing.locales.includes(locale as "en" | "ar")) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        // Dynamically fetch the absolute JSON dictionary file path from the project root
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});