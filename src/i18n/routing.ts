/**
 * @file routing.ts
 * @package src/i18n
 * @preview Centralized routing configuration for next-intl. Defines supported locales,
 * default fallback rules, and exports localized navigation utilities.
 */

import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

/**
 * Global i18n routing policies definition.
 * Configures the localized slugs and strategy for the Next.js App Router.
 */
export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ["en", "ar"],

    // Used when no locale matches a request (e.g., fallback home root URL "/")
    defaultLocale: "en",

    // Clean URL strategy: hides the locale prefix for the default language if desired
    localePrefix: "always"
});

/**
 * Localized navigation utilities bound to the strict architectural routing rules.
 * Wrap and override standard Next.js navigation components to append locale prefixes under the hood.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);