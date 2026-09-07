/**
 * @file footer.tsx
 * @package src/components/shared
 * @preview Global layout footer component. Displays copyright notices and dynamic 
 * localized text branding attributes across the application wrapper.
 */

"use client";

import { useTranslations } from "next-intl";

/**
 * Global application structural footer layout.
 * * @function Footer
 * @returns {React.JSX.Element} The foundational responsive bottom layout footer strip.
 */
export function Footer() {
    // Bind to the global layout translation namespace
    const t = useTranslations("Footer");
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-border bg-background mt-auto">
            <div className="container mx-auto max-w-4xl h-16 flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 sm:py-0">
                {/* Dynamic Localized Copyright Information */}
                <p className="text-xs text-muted-foreground font-sans">
                    &copy; {currentYear} AT. {t("rights")}
                </p>

                {/* Visual Brand Signature / Tech Stack Note */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{t("builtWith")}</span>
                    <span className="font-semibold text-foreground">Next.js</span>
                    <span>&amp;</span>
                    <span className="font-semibold text-foreground">Tailwind</span>
                </div>
            </div>
        </footer>
    );
}