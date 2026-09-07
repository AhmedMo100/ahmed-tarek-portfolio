"use client";

/**
 * @file projects-dropdown.tsx
 * @description Hover-based projects navigation dropdown.
 */

import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import { Link } from "@/i18n/routing";

interface ProjectItem {
    id: string;
    slug: string;
    title: string;
}

interface ProjectsDropdownProps {
    locale: string;
    projects: ProjectItem[];
    labels: {
        projects: string;
        projectsDescription: string;
        viewAllProjects: string;
    };
}

export function ProjectsDropdown({
    locale,
    projects,
    labels,
}: ProjectsDropdownProps) {
    const [open, setOpen] = useState(false);

    const direction = locale === "ar" ? "rtl" : "ltr";

    return (
        <div
            dir={direction}
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            {/* Projects Trigger */}
            <Link
                href="/projects"
                className="
                    flex
                    items-center
                    gap-1
                    text-sm
                    font-medium
                    text-muted-foreground
                    transition-colors
                    duration-200
                    hover:text-foreground
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-primary/50
                    rounded-sm
                "
                aria-haspopup="menu"
                aria-expanded={open}
            >
                <span>{labels.projects}</span>

                <ChevronDown
                    size={14}
                    strokeWidth={1.8}
                    className={`
                        shrink-0
                        transition-transform
                        duration-200
                        ${open ? "rotate-180" : ""}
                    `}
                />
            </Link>

            {/* Hover bridge + Dropdown */}
            <div
                className={`
                    absolute
                    start-1/2
                    top-full
                    z-50
                    w-[calc(100vw-2rem)]
                    max-w-[430px]
                    -translate-x-1/2
                    pt-3
                    transition-all
                    duration-200
                    sm:start-1/2
                    rtl:translate-x-1/2
                    ${
                        open
                            ? "visible translate-y-0 opacity-100"
                            : "invisible -translate-y-2 opacity-0 pointer-events-none"
                    }
                `}
            >
                <div
                    className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-border
                        bg-background/98
                        text-foreground
                        shadow-2xl
                        shadow-black/10
                        dark:shadow-black/30
                        backdrop-blur-xl
                    "
                    role="menu"
                >
                    {/* Header */}
                    <div className="border-b border-border/70 p-5 text-start">
                        <h3 className="text-sm font-semibold text-primary">
                            {labels.projects}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            {labels.projectsDescription}
                        </p>
                    </div>

                    {/* Projects */}
                    <div className="p-3">
                        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                            {projects.map((project) => (
                                <Link
                                    key={project.id}
                                    href={`/projects/${project.slug}`}
                                    onClick={() => setOpen(false)}
                                    className="
                                        group
                                        rounded-xl
                                        border
                                        border-transparent
                                        px-3.5
                                        py-3
                                        text-start
                                        transition-all
                                        duration-200
                                        hover:border-primary/20
                                        hover:bg-primary/5
                                    "
                                    role="menuitem"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <span
                                            className="
                                                min-w-0
                                                truncate
                                                text-sm
                                                font-medium
                                                text-foreground
                                                transition-colors
                                                group-hover:text-primary
                                            "
                                        >
                                            {project.title}
                                        </span>

                                        <ArrowUpRight
                                            size={14}
                                            strokeWidth={1.8}
                                            className="
                                                shrink-0
                                                text-muted-foreground
                                                opacity-0
                                                transition-all
                                                duration-200
                                                group-hover:translate-x-0.5
                                                group-hover:text-primary
                                                group-hover:opacity-100
                                                rtl:rotate-[-90deg]
                                                rtl:group-hover:-translate-x-0.5
                                            "
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-border/70 p-3">
                        <Link
                            href="/projects"
                            onClick={() => setOpen(false)}
                            className="
                                group
                                flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                px-4
                                py-2.5
                                text-sm
                                font-medium
                                text-foreground
                                transition-all
                                duration-200
                                hover:bg-primary/5
                                hover:text-primary
                            "
                            role="menuitem"
                        >
                            <span>{labels.viewAllProjects}</span>

                            <ArrowUpRight
                                size={15}
                                strokeWidth={1.8}
                                className="
                                    text-muted-foreground
                                    transition-all
                                    duration-200
                                    group-hover:translate-x-0.5
                                    group-hover:text-primary
                                    rtl:rotate-[-90deg]
                                    rtl:group-hover:-translate-x-0.5
                                "
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}