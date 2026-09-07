/**
 * @file query-provider.tsx
 * @package src/providers
 * @preview Core asynchronous state management provider wrapping TanStack Query.
 * Injects global caching, retries, and data revalidation layers into client components.
 */

"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Custom global React Query provider wrapper.
 * Initializes a single isolated query client instance per user session.
 * * @function QueryProvider
 * @param {Object} props - Standard React layout structural interfaces.
 * @param {React.ReactNode} props.children - Downstream dynamic client fragments.
 * @returns {React.JSX.Element} Fully configured client context boundary layout.
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
    // Create the QueryClient instance safely inside a state to prevent cross-request data leaks on the server
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Global Cache & Freshness Settings
                        staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes before considering a background re-fetch
                        gcTime: 1000 * 60 * 10,    // Garbage collection removes unused cache data after 10 minutes
                        refetchOnWindowFocus: false, // Disables automatic re-fetching when shifting browser tabs (highly optimized)
                        retry: 1, // Retry failed network requests only once before throwing an error
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}