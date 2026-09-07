
/**
 * @file workspace-sidebar.tsx
 * @package src/components/home/project-workspace
 * @preview Responsive interactive workspace navigation inspired by modern monorepo explorers.
 */

"use client";

import { motion } from "framer-motion";
import { FolderGit2, FolderOpen } from "lucide-react";
import { useTranslations } from "next-intl";

import type { LocalizedProject } from "@/services/projects";

interface WorkspaceSidebarProps {
    projects: LocalizedProject[];
    activeProject: LocalizedProject;
    onSelect(project: LocalizedProject): void;
}

export function WorkspaceSidebar({
    projects,
    activeProject,
    onSelect,
}: WorkspaceSidebarProps) {
    const t = useTranslations("ProjectWorkspace");

    return (
        <aside
            className="
                min-w-0
                border-b
                border-border
                bg-muted/20
                lg:border-b-0
                lg:border-e
            "
        >
            {/* Header */}
            <div className="border-b border-border px-4 py-4 sm:px-5 md:px-6 md:py-5">
                <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/10">
                        <FolderGit2 className="h-3.5 w-3.5 text-primary" />
                    </div>

                    <span className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs sm:tracking-[0.2em] md:tracking-[0.25em]">
                        {t("workspaceExplorer")}
                    </span>
                </div>
            </div>

            {/* Projects */}
            <nav
                aria-label={t("workspaceExplorer")}
                className="
                    flex
                    gap-2
                    overflow-x-auto
                    overscroll-x-contain
                    p-3
                    [scrollbar-width:none]
                    [&::-webkit-scrollbar]:hidden
                    lg:block
                    lg:space-y-2
                    lg:overflow-visible
                    lg:p-4
                "
            >
                {projects.map((project) => {
                    const isActive = project.id === activeProject.id;

                    return (
                        <button
                            key={project.id}
                            type="button"
                            aria-current={isActive ? "true" : undefined}
                            onClick={() => onSelect(project)}
                            className="
                                group
                                relative
                                flex
                                min-w-52
                                max-w-64
                                shrink-0
                                items-center
                                gap-3
                                overflow-hidden
                                rounded-xl
                                border
                                border-transparent
                                px-3.5
                                py-3
                                text-start
                                transition-all
                                duration-200
                                hover:border-border
                                hover:bg-muted/50
                                active:scale-[0.98]
                                sm:min-w-56
                                sm:px-4
                                lg:min-w-0
                                lg:max-w-none
                                lg:w-full
                            "
                        >
                            {/* Active Background */}
                            {isActive && (
                                <motion.div
                                    layoutId="workspace-active-project"
                                    className="
                                        absolute
                                        inset-0
                                        rounded-xl
                                        border
                                        border-primary/20
                                        bg-primary/10
                                    "
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30,
                                    }}
                                />
                            )}

                            {/* Active Glow */}
                            {isActive && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="
                                        pointer-events-none
                                        absolute
                                        -end-8
                                        top-1/2
                                        h-16
                                        w-16
                                        -translate-y-1/2
                                        rounded-full
                                        bg-primary/10
                                        blur-2xl
                                    "
                                />
                            )}

                            {/* Icon */}
                            <div
                                className="
                                    relative
                                    z-10
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-border/70
                                    bg-background/50
                                    transition-all
                                    duration-200
                                    group-hover:border-primary/20
                                "
                            >
                                {isActive ? (
                                    <FolderOpen className="h-4.5 w-4.5 text-primary" />
                                ) : (
                                    <FolderGit2 className="h-4.5 w-4.5 text-muted-foreground transition-colors group-hover:text-foreground" />
                                )}
                            </div>

                            {/* Text */}
                            <div className="relative z-10 min-w-0 flex-1 overflow-hidden">
                                <p className="truncate text-xs font-semibold text-foreground sm:text-sm">
                                    {project.workspacePath}
                                </p>

                                <p className="mt-0.5 truncate text-[11px] text-muted-foreground sm:text-xs">
                                    {project.title}
                                </p>
                            </div>

                            {/* Active Indicator */}
                            {isActive && (
                                <motion.span
                                    layoutId="workspace-active-indicator"
                                    className="
                                        relative
                                        z-10
                                        ms-auto
                                        h-1.5
                                        w-1.5
                                        shrink-0
                                        rounded-full
                                        bg-primary
                                        shadow-[0_0_10px_var(--primary)]
                                    "
                                />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Mobile Scroll Hint */}
            {projects.length > 1 && (
                <div className="flex items-center justify-end px-4 pb-3 lg:hidden">
                    <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-muted-foreground/50">
                        Swipe to explore
                    </span>
                </div>
            )}
        </aside>
    );
}
