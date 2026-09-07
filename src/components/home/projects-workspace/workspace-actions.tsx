/**
 * @file workspace-actions.tsx
 * @package src/components/home/project-workspace
 * @preview Project external resources and deployment actions.
 */

"use client";

import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useTranslations } from "next-intl";

import type { LocalizedProject } from "@/services/projects";

interface WorkspaceActionsProps {
    project: LocalizedProject;
}

/**
 * External project actions.
 */
export function WorkspaceActions({
    project,
}: WorkspaceActionsProps) {
    const t = useTranslations("ProjectWorkspace");

    return (
        <section className="grid gap-4 md:grid-cols-3">

            {project.liveUrl && (

                <ActionCard
                    href={project.liveUrl}
                    icon={<Globe className="h-5 w-5" />}
                    title={t("actions.liveDemo")}
                    subtitle="Production Deployment"
                />

            )}

            {project.githubFront && (

                <ActionCard
                    href={project.githubFront}
                    icon={<FaGithub className="h-5 w-5" />}
                    title="Frontend"
                    subtitle={t("actions.sourceCode")}
                />

            )}

            {project.githubBack && (

                <ActionCard
                    href={project.githubBack}
                    icon={<FaGithub className="h-5 w-5" />}
                    title="Backend"
                    subtitle={t("actions.sourceCode")}
                />

            )}

        </section>
    );
}

interface ActionCardProps {
    href: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
}

function ActionCard({
    href,
    title,
    subtitle,
    icon,
}: ActionCardProps) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="
                group
                rounded-2xl
                border
                border-border
                bg-card
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary/30
                hover:shadow-lg
            "
        >
            <div className="flex items-start justify-between">

                <div>

                    <div className="mb-4 text-primary">

                        {icon}

                    </div>

                    <h3 className="font-semibold">

                        {title}

                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">

                        {subtitle}

                    </p>

                </div>

                <ArrowUpRight
                    className="
                        h-5
                        w-5
                        transition-transform
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                    "
                />

            </div>

        </Link>
    );
}