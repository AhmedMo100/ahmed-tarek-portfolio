/**
 * @file progress-provider.tsx
 * @package src/providers
 * @preview Global page navigation progress bar provider utilizing 'nextjs-toploader'.
 * Injects a fluid, customizable top loading indicator mapped to the active design system.
 */

"use client";

import NextTopLoader from "nextjs-toploader";

/**
 * Custom application page routing progress indicator provider.
 * Sets structural timing, sizing, and aesthetic configurations for the global layout stream.
 * 
 * @function ProgressProvider
 * @returns {React.JSX.Element} Fully configured top loading loader component.
 */
export function ProgressProvider() {
    return (
        <NextTopLoader
            // The color of the progress bar (using a fallback hex or linking to design tokens)
            // We use a high-visibility primary tone that matches our fluid theme palette
            color="var(--color-primary, #3b82f6)"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px var(--color-primary, #3b82f6), 0 0 5px var(--color-primary, #3b82f6)"
        />
    );
}