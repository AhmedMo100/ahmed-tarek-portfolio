
/**
 * @file cv-button.tsx
 * @package src/components/shared
 * @preview CV button using the developer profile CV URL.
 */

import { getProfile } from "@/services/profile";

export async function CVButton() {
    const profile = await getProfile();

    return (
        <a
            href={profile?.cvUrl || "#"}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 min-w-10 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-semibold text-foreground transition-all hover:bg-muted"
        >
            CV
        </a>
    );
}

