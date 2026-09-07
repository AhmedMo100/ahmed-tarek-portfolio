
/**
 * @file project-filters.tsx
 * @package src/components/projects
 * @description Project category filter navigation.
 */

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

interface ProjectCategory {
    id: string;
    name: string;
    slug: string;
}

interface ProjectFiltersProps {
    allLabel: string;
    categories: ProjectCategory[];
}

export function ProjectFilters({
    allLabel,
    categories,
}: ProjectFiltersProps) {
    const searchParams = useSearchParams();

    const activeCategory =
        searchParams.get("category") ?? "all";

    const filters: ProjectCategory[] = [
        {
            id: "all",
            name: allLabel,
            slug: "all",
        },
        ...categories,
    ];

    return (
        <div className="px-4 py-10">
            <div className="mx-auto max-w-full overflow-x-auto scrollbar-none">
                <nav
                    aria-label="Project categories"
                    className="
                        mx-auto
                        flex
                        w-max
                        min-w-full
                        items-center
                        justify-center
                        gap-1
                        rounded-2xl
                        border
                        border-border
                        bg-card/50
                        p-1
                        backdrop-blur-md
                        shadow-sm
                        md:w-fit
                        md:min-w-0
                    "
                >
                    {filters.map((filter) => {
                        const isActive =
                            activeCategory === filter.slug;

                        const params = new URLSearchParams(
                            searchParams.toString()
                        );

                        if (filter.slug === "all") {
                            params.delete("category");
                        } else {
                            params.set(
                                "category",
                                filter.slug
                            );
                        }

                        return (
                            <Link
                                key={filter.id}
                                href={`?${params.toString()}`}
                                aria-current={
                                    isActive
                                        ? "page"
                                        : undefined
                                }
                                className="
                                    relative
                                    shrink-0
                                    rounded-xl
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    transition-colors
                                "
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-category"
                                        className="
                                            absolute
                                            inset-0
                                            rounded-xl
                                            bg-primary
                                        "
                                        transition={{
                                            type: "spring",
                                            bounce: 0.2,
                                            duration: 0.45,
                                        }}
                                    />
                                )}

                                <span
                                    className={`
                                        relative
                                        z-10
                                        whitespace-nowrap
                                        ${
                                            isActive
                                                ? "text-primary-foreground"
                                                : "text-muted-foreground hover:text-foreground"
                                        }
                                    `}
                                >
                                    {filter.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}

