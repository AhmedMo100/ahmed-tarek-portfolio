/**
 * @file toaster-provider.tsx
 * @package src/providers
 * @preview Global custom application notification provider wrapping the 'sonner' library.
 * Synchronizes layout toasts with the active application theme state automatically.
 */

"use client";

import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "next-themes";

/**
 * Custom application toaster provider layout shell.
 * Injects global toaster styling, configurations, and contextual theme alignment handlers.
 * 
 * @function ToasterProvider
 * @returns {React.JSX.Element} Fully configured dynamic responsive toaster element.
 */
export function ToasterProvider() {
    const { theme } = useTheme();

    return (
        <SonnerToaster
            // Dynamically matches the application dark/light theme matrix
            theme={theme as "light" | "dark" | "system"}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-muted-foreground",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                },
            }}
        />
    );
}