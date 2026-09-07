/**
 * @file theme-toggle.tsx
 * @package src/components/shared
 * @preview Reactive button component driving the dark/light mode next-themes switch pipeline.
 */

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * A highly animated theme toggler component.
 * Features full hydration countermeasures to suppress flashing during initial client loads.
 * * @function ThemeToggle
 * @returns {React.JSX.Element | null} An optimized button rendering a sun or moon icon dynamically.
 */
export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Core Hydration Defense: Defer state mutation to the next animation frame to prevent synchronous cascading renders
    useEffect(() => {
        let animationFrameId = 0;

        const handleMount = () => {
            setMounted(true);
        };

        // Schedule the state update safely outside the immediate effect execution loop
        animationFrameId = requestAnimationFrame(handleMount);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    if (!mounted) return <div className="w-9 h-9 rounded-md bg-muted/20 animate-pulse" />;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md border border-border bg-background text-foreground transition-all duration-200 hover:bg-muted active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle application color theme"
        >
            {theme === "dark" ? (
                // Sun Icon
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                </svg>
            ) : (
                // Moon Icon
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
            )}
        </button>
    );
}