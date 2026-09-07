/**
 * @file language-switcher.tsx
 * @package src/components/shared
 * @preview Localized language selector utilizing next-intl custom routing primitives 
 * to swap locale paths while preserving internal application route states.
 */

"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

/**
 * Highly accessible dynamic language switcher selector button.
 * Intercepts the current pathname context and triggers a seamless client-side transition.
 * * @function LanguageSwitcher
 * @returns {React.JSX.Element} A clean action trigger to swap application localization modes.
 */
export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = () => {
        // Determine the target destination locale token
        const targetLocale = locale === "en" ? "ar" : "en";

        // Project detail routes now use a single (English) slug across
        // both locales, so the pathname itself never needs translation —
        // only the locale prefix changes.
        router.replace(pathname, { locale: targetLocale });
    };

    return (
        <button
            onClick={handleLanguageChange}
            className="px-3 py-2 text-sm font-medium rounded-md border border-border bg-background text-foreground transition-all duration-200 hover:bg-muted active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary font-sans"
            aria-label="Switch language interface"
        >
            {locale === "en" ? "Arabic" : "الإنجليزية"}
        </button>
    );
}