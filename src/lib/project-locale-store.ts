"use client";

/**
 * @file project-locale-store.ts
 * @package src/lib
 * @description
 * Lightweight cross-component store holding the currently viewed
 * project's localized slug pair (slugEn/slugAr), so the global
 * LanguageSwitcher can resolve the correct target route when the
 * user is on a project details page. Avoids adding a Context
 * Provider to the root layout for a single, narrow use case.
 */

import { useEffect, useSyncExternalStore } from "react";

type ProjectSlugs = {
    slugEn: string;
    slugAr: string;
} | null;

let currentSlugs: ProjectSlugs = null;
const listeners = new Set<() => void>();

function emitChange() {
    listeners.forEach((listener) => listener());
}

/**
 * Updates the currently tracked project slug pair.
 */
export function setProjectSlugs(slugs: ProjectSlugs) {
    currentSlugs = slugs;
    emitChange();
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function getSnapshot() {
    return currentSlugs;
}

/**
 * Reads the currently tracked project slug pair (null outside
 * project detail pages).
 */
export function useProjectSlugs() {
    return useSyncExternalStore(subscribe, getSnapshot, () => null);
}

/**
 * Mounted inside the project details page to register the current
 * project's localized slugs, and clear them on unmount so stale
 * data never leaks into unrelated routes.
 */
export function ProjectLocaleSync({
    slugEn,
    slugAr,
}: {
    slugEn: string;
    slugAr: string;
}) {
    useEffect(() => {
        setProjectSlugs({ slugEn, slugAr });
        return () => setProjectSlugs(null);
    }, [slugEn, slugAr]);

    return null;
}