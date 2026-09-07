/**
 * @file workspace-dependencies.tsx
 * @package src/components/home/project-workspace
 * @preview Displays internal shared workspace packages.
 */

"use client";

import { Boxes } from "lucide-react";
import { useTranslations } from "next-intl";

import type { LocalizedProject } from "@/services/projects";

interface WorkspaceDependenciesProps {
    project: LocalizedProject;
}

/**
 * Shared workspace dependencies.
 */
export function WorkspaceDependencies({
    project,
}: WorkspaceDependenciesProps) {
    const t = useTranslations("ProjectWorkspace");

    return (
        <section className="rounded-2xl border border-border bg-card p-6">

            <div className="mb-6 flex items-center gap-2">

                <Boxes className="h-5 w-5 text-primary" />

                <h3 className="font-semibold">

                    {t("internalDependencies")}

                </h3>

            </div>

            {project.sharedPackages.length === 0 ? (

                <p className="text-sm text-muted-foreground">

                    {t("noInternalDeps")}

                </p>

            ) : (

                <div className="space-y-3">

                    {project.sharedPackages.map((pkg) => (

                        <div
                            key={pkg}
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-border
                                bg-muted/30
                                px-4
                                py-3
                                transition-all
                                duration-200
                                hover:border-primary/30
                                hover:bg-primary/10
                            "
                        >

                            <Boxes className="h-4 w-4 text-primary" />

                            <span className="font-mono text-sm">

                                {pkg}

                            </span>

                        </div>

                    ))}

                </div>

            )}

        </section>
    );
}