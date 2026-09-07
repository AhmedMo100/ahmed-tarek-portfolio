/**
 * @file workspace-technologies.tsx
 * @package src/components/home/project-workspace
 * @preview Displays the project's primary technology stack.
 */

"use client";

import { Cpu } from "lucide-react";
import { useTranslations } from "next-intl";

import type { LocalizedProject } from "@/services/projects";

interface WorkspaceTechnologiesProps {
    project: LocalizedProject;
}

/**
 * Technology stack panel.
 */
export function WorkspaceTechnologies({
    project,
}: WorkspaceTechnologiesProps) {
    const t = useTranslations("ProjectWorkspace");

    return (
        <section className="rounded-2xl border border-border bg-card p-6">

            <div className="mb-6 flex items-center gap-2">

                <Cpu className="h-5 w-5 text-primary" />

                <h3 className="font-semibold">

                    {t("engineMetrics")}

                </h3>

            </div>

            <div className="flex flex-wrap gap-3">

                {project.technologies.map((technology) => (

                    <span
                        key={technology}
                        className="
                            rounded-full
                            border
                            border-border
                            bg-muted/40
                            px-4
                            py-2
                            text-sm
                            font-medium
                            transition-all
                            duration-200
                            hover:border-primary/30
                            hover:bg-primary/10
                        "
                    >
                        {technology}
                    </span>

                ))}

            </div>

        </section>
    );
}