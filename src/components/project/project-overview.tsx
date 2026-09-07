/**
 * @file project-overview.tsx
 * @package src/components/project
 * @description
 * Comprehensive project overview combining the project narrative,
 * categories, technologies, shared packages, and workspace details.
 */

"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
    Boxes,
    Code2,
    FolderGit2,
    Layers3,
} from "lucide-react";

import type { LocalizedProject } from "@/services/projects";

interface ProjectOverviewProps {
    project: LocalizedProject;
}

export function ProjectOverview({
    project,
}: ProjectOverviewProps) {
    const t =
        useTranslations(
            "projects.details.overview",
        );

    return (
        <section className="relative px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <div className="mx-auto w-full max-w-6xl">

                {/* ====================================================
                    SECTION HEADER
                    ==================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    transition={{
                        duration: 0.7,
                        ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                        ],
                    }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />

                        {t("eyebrow")}
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        {t("title")}
                    </h2>
                </motion.div>


                {/* ====================================================
                    MAIN CONTENT
                    ==================================================== */}

                <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

                    {/* ====================================================
                        PROJECT CONTENT
                        ==================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 24,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        transition={{
                            duration: 0.7,
                        }}
                    >
                        <div className="relative">

                            <div
                                aria-hidden="true"
                                className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-primary via-primary/30 to-transparent"
                            />

                            <div className="pl-6 sm:pl-8">
                                <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                                    {t("aboutTitle")}
                                </h3>

                                <div className="mt-6 whitespace-pre-line text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
                                    {project.content}
                                </div>
                            </div>

                        </div>
                    </motion.div>


                    {/* ====================================================
                        PROJECT DETAILS
                        ==================================================== */}

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">

                        {/* Categories */}

                        <OverviewCard
                            icon={
                                <Layers3 className="h-5 w-5" />
                            }
                            title={
                                t(
                                    "categories",
                                )
                            }
                            index={0}
                        >
                            <div className="flex flex-wrap gap-2">
                                {project.categories.map(
                                    (
                                        category,
                                    ) => (
                                        <span
                                            key={
                                                category.id
                                            }
                                            className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"
                                        >
                                            {
                                                category.name
                                            }
                                        </span>
                                    ),
                                )}
                            </div>
                        </OverviewCard>


                        {/* Technologies */}

                        <OverviewCard
                            icon={
                                <Code2 className="h-5 w-5" />
                            }
                            title={
                                t(
                                    "technologies",
                                )
                            }
                            index={1}
                        >
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map(
                                    (
                                        technology,
                                    ) => (
                                        <span
                                            key={
                                                technology
                                            }
                                            className="rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                                        >
                                            {
                                                technology
                                            }
                                        </span>
                                    ),
                                )}
                            </div>
                        </OverviewCard>


                        {/* Shared Packages */}

                        {project.sharedPackages
                            .length >
                            0 && (
                            <OverviewCard
                                icon={
                                    <Boxes className="h-5 w-5" />
                                }
                                title={
                                    t(
                                        "sharedPackages",
                                    )
                                }
                                index={2}
                            >
                                <div className="flex flex-wrap gap-2">
                                    {project.sharedPackages.map(
                                        (
                                            packageName,
                                        ) => (
                                            <span
                                                key={
                                                    packageName
                                                }
                                                className="rounded-lg border border-border bg-muted/40 px-3 py-1.5 font-mono text-xs text-muted-foreground"
                                            >
                                                {
                                                    packageName
                                                }
                                            </span>
                                        ),
                                    )}
                                </div>
                            </OverviewCard>
                        )}


                        {/* Workspace */}

                        <OverviewCard
                            icon={
                                <FolderGit2 className="h-5 w-5" />
                            }
                            title={
                                t(
                                    "workspace",
                                )
                            }
                            index={3}
                        >
                            <code className="block overflow-x-auto rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                                {
                                    project.workspacePath
                                }
                            </code>
                        </OverviewCard>

                    </div>
                </div>
            </div>
        </section>
    );
}


interface OverviewCardProps {
    icon: React.ReactNode;
    title: string;
    index: number;
    children: React.ReactNode;
}

function OverviewCard({
    icon,
    title,
    index,
    children,
}: OverviewCardProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 18,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
                amount: 0.2,
            }}
            transition={{
                duration: 0.5,
                delay:
                    index * 0.08,
            }}
            whileHover={{
                y: -3,
            }}
            className="
                rounded-2xl
                border
                border-border/70
                bg-card/40
                p-5
                shadow-sm
                transition-colors
                duration-300
                hover:border-primary/25
                hover:bg-card
                sm:p-6
            "
        >
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/5 text-primary">
                    {icon}
                </div>

                <h3 className="font-bold text-foreground">
                    {title}
                </h3>
            </div>

            <div className="mt-5">
                {children}
            </div>
        </motion.div>
    );
}
