
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { LocalizedProject } from "@/services/projects";
import { WorkspaceSidebar } from "./workspace-sidebar";
import { WorkspaceOverview } from "./worksapace-overview";
import { WorkspaceDependencies } from "./workspace-dependencies";
import { WorkspaceTechnologies } from "./workspace-technologies";
import { WorkspaceActions } from "./workspace-actions";
import { SectionDivider } from "@/components/shared/section-divider";

interface ProjectWorkspaceProps {
    initialProjects: LocalizedProject[];
}

export function ProjectWorkspace({
    initialProjects,
}: ProjectWorkspaceProps) {
    const t = useTranslations("ProjectWorkspace");
    const navigationT = useTranslations("Navigation");
    const locale = useLocale();

    const projects = useMemo(() => initialProjects, [initialProjects]);

    const [activeProject, setActiveProject] =
        useState<LocalizedProject | null>(projects.at(0) ?? null);

    if (!activeProject) {
        return (
            <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mx-auto max-w-xl text-center">
                        <h2 className="text-2xl font-bold sm:text-3xl">
                            {t("sectionTitle")}
                        </h2>

                        <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">
                            No featured projects available.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
            {/* Ambient Primary Glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl sm:h-80 sm:w-80"
            />

            <div className="container relative mx-auto min-w-0 px-4 sm:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="max-w-3xl"
                >
                    <h2 className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl md:text-5xl">
                        {t("sectionTitle")}
                    </h2>

                    <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-5 sm:text-base sm:leading-7 md:text-lg md:leading-8">
                        {t("sectionSubtitle")}
                    </p>
                </motion.div>

                {/* Workspace */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 28,
                        scale: 0.99,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.1,
                    }}
                    transition={{
                        duration: 0.7,
                        delay: 0.08,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative mt-10 min-w-0 overflow-hidden rounded-2xl border border-border bg-card/40 shadow-2xl backdrop-blur-xl sm:mt-12 sm:rounded-3xl md:mt-14"
                >
                    {/* Primary Accent */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
                    />

                    <div className="grid min-w-0 md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)]">
                        <WorkspaceSidebar
                            projects={projects}
                            activeProject={activeProject}
                            onSelect={setActiveProject}
                        />

                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={activeProject.id}
                                initial={{
                                    opacity: 0,
                                    y: 14,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -14,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="grid min-w-0 gap-4 p-4 sm:gap-5 sm:p-5 md:p-7"
                            >
                                <WorkspaceOverview
                                    project={activeProject}
                                />

                                <div className="grid min-w-0 gap-4 sm:gap-5 xl:grid-cols-2">
                                    <WorkspaceDependencies
                                        project={activeProject}
                                    />

                                    <WorkspaceTechnologies
                                        project={activeProject}
                                    />
                                </div>

                                <WorkspaceActions
                                    project={activeProject}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* View All Projects */}
                <div className="mt-12 flex justify-center pt-2 sm:mt-14">
                    <a
                        href={`/${locale}/projects`}
                        className="
                                            group
                                            inline-flex
                                            items-center
                                            gap-2
                                            rounded-full
                                            border
                                            border-primary/25
                                            bg-primary/5
                                            px-5
                                            py-3
                                            text-xs
                                            font-semibold
                                            text-primary
                                            shadow-sm
                                            transition-all
                                            duration-300
                                            hover:-translate-y-0.5
                                            hover:border-primary/50
                                            hover:bg-primary
                                            hover:text-primary-foreground
                                            hover:shadow-[0_8px_30px_-10px_var(--primary)]
                                            active:scale-95
                                            sm:px-6
                                            sm:py-3.5
                                            sm:text-sm
                                        "
                    >
                        <span>{navigationT("viewAllProjects")}</span>

                        <ArrowRight
                            className="
                                                h-3.5
                                                w-3.5
                                                transition-transform
                                                duration-300
                                                group-hover:translate-x-1
                                                rtl:rotate-180
                                                rtl:group-hover:-translate-x-1
                                            "
                        />
                    </a>
                </div>


                {/* ------------------------------------------------------ */}
                {/* Section Ending Divider                                 */}
                {/* ------------------------------------------------------ */}
                <SectionDivider className="mt-30" />
            </div>
        </section>
    );
}

