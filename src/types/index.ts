/**
 * @file index.ts
 * @package src/types
 * @preview Global domain-specific TypeScript type declarations and structural interfaces
 * utilized across components, pages, and application layers.
 */

/**
 * Supported localized routing language tokens within the application platform.
 */
export type Locale = "en" | "ar";

/**
 * Standard dynamic routing segment interface injected by the Next.js App Router
 * inside localized page architectures.
 */
export interface LocalizedPageProps {
    params: Promise<{
        locale: Locale;
    }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Standard dynamic layout segment interface governing asynchronous contextual wrappers.
 */
export interface LocalizedLayoutProps {
    children: React.ReactNode;
    params: Promise<{
        locale: Locale;
    }>;
}

/**
 * Global API response generic blueprint for dynamic server operations.
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
}

/**
 * Global Application Asset Images mapping for multi-language hero features.
 */
export const Images = {
    hero: {
        en: "https://res.cloudinary.com/dx1vy3nro/image/upload/v1788872791/ChatGPT_Image_Sep_8_2026_at_04_05_42_PM_n8wjqt.png",
        ar: "https://res.cloudinary.com/dx1vy3nro/image/upload/v1788872791/ChatGPT_Image_Sep_8_2026_at_04_05_42_PM_n8wjqt.png",
    }
};