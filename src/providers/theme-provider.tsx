/**
 * @file theme-provider.tsx
 * @package src/providers
 * @preview Global client-side context provider that coordinates fluid Light/Dark theme switching 
 * by synchronizing next-themes orchestration with the Tailwind CSS v4 class architecture.
 */

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * High-performance Theme Provider component wrapping the application's visual tree.
 * Enforces serverless-friendly hydration safety rules for localized themes.
 * * @function ThemeProvider
 * @param {React.ComponentProps<typeof NextThemesProvider>} props - Structural attributes and configuration hooks extracted from next-themes.
 * @param {React.ReactNode} props.children - Downstream dynamic component nodes inside the layout tree.
 * @returns {React.JSX.Element} Reactive context-wrapped container element.
 */
export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}