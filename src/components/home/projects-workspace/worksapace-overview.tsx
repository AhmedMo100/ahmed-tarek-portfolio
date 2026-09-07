
 /**
  * @file workspace-overview.tsx
  * @package src/components/home/project-workspace
  * @preview Responsive main project overview card.
  */

"use client";

import { FileCode2 } from "lucide-react";

import type { LocalizedProject } from "@/services/projects";

interface WorkspaceOverviewProps {
    project: LocalizedProject;
}

/**
 * Displays the currently selected project summary.
 */
export function WorkspaceOverview({
    project,
}: WorkspaceOverviewProps) {
    return (
        <article
            className="
                relative
                min-w-0
                overflow-hidden
                rounded-xl
                border
                border-border
                bg-card
                p-5
                shadow-sm
                sm:rounded-2xl
                sm:p-6
                md:p-8
            "
        >
            {/* Ambient Primary Glow */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -end-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    bg-primary/5
                    blur-3xl
                    sm:-end-20
                    sm:-top-20
                    sm:h-48
                    sm:w-48
                "
            />

            <div className="relative z-10 min-w-0">
                {/* File Path */}
                <div className="flex min-w-0 items-start gap-2 text-primary">
                    <FileCode2 className="mt-0.5 h-4 w-4 shrink-0" />

                    <span
                        className="
                            min-w-0
                            truncate
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.16em]
                            sm:text-xs
                            sm:tracking-[0.2em]
                            md:tracking-[0.25em]
                        "
                        title={`${project.workspacePath}/package.json`}
                    >
                        {project.workspacePath}/package.json
                    </span>
                </div>

                {/* Project Title */}
                <h3
                    className="
                        mt-4
                        text-2xl
                        font-bold
                        leading-tight
                        tracking-tight
                        sm:mt-5
                        sm:text-3xl
                    "
                >
                    {project.title}
                </h3>

                {/* Description */}
                <p
                    className="
                        mt-4
                        max-w-3xl
                        text-sm
                        leading-6
                        text-muted-foreground
                        sm:mt-5
                        sm:text-base
                        sm:leading-7
                        md:text-lg
                        md:leading-8
                    "
                >
                    {project.description}
                </p>
            </div>
        </article>
    );
}
