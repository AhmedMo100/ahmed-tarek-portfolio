/**
 * @file project-story-showcase.tsx
 * @package src/components/project
 * @description
 * Combined project story and visual showcase section.
 */

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon, Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";

import type { LocalizedProject } from "@/services/projects";

interface ProjectStoryShowcaseProps {
    project: LocalizedProject;
}

export function ProjectStoryShowcase({
    project,
}: ProjectStoryShowcaseProps) {
    const t = useTranslations(
        "projects.details.story",
    );

    const hasImages =
        project.images.length > 0;

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

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                        {t("description")}
                    </p>
                </motion.div>


                {/* ====================================================
                    PROJECT STORY
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
                    className="
                        relative
                        mx-auto
                        mt-14
                        max-w-4xl
                        self-start
                        overflow-hidden
                        rounded-3xl
                        border
                        border-border/70
                        bg-card/40
                        p-6
                        sm:p-8
                        lg:p-10
                    "
                >
                    {/* Background accent */}

                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            right-0
                            top-0
                            h-48
                            w-48
                            rounded-full
                            bg-primary/5
                            blur-3xl
                        "
                    />

                    <div className="relative">

                        {/* Story label */}

                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/5 text-primary">
                                <Lightbulb className="h-5 w-5" />
                            </div>

                            <div>
                                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                                    {t("storyLabel")}
                                </span>

                                <h3 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                                    {project.title}
                                </h3>
                            </div>
                        </div>


                        {/* Story content */}

                        <div className="mt-8 whitespace-pre-line text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
                            {project.content}
                        </div>

                    </div>
                </motion.div>


                {/* ====================================================
                    PROJECT GALLERY
                    ==================================================== */}

                {hasImages && (
                    <div className="mt-20 self-start">

                        {/* Gallery heading */}

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
                                amount: 0.3,
                            }}
                            transition={{
                                duration: 0.6,
                            }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/5 text-primary">
                                <ImageIcon className="h-5 w-5" />
                            </div>

                            <h3 className="mt-5 text-2xl font-bold text-foreground sm:text-3xl">
                                {t("galleryTitle")}
                            </h3>

                            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                                {t("galleryDescription")}
                            </p>
                        </motion.div>


                        {/* ====================================================
                            GALLERY GRID
                            ==================================================== */}

                        <div className="mt-10 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {project.images.map(
                                (
                                    image,
                                    index,
                                ) => (
                                    <motion.div
                                        key={
                                            image.id
                                        }
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
                                            amount: 0.15,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay:
                                                index *
                                                0.06,
                                        }}
                                        whileHover={{
                                            y: -4,
                                        }}
                                        className={`
                                            group
                                            relative
                                            self-start
                                            overflow-hidden
                                            rounded-2xl
                                            border
                                            border-border/70
                                            bg-muted
                                            ${
                                                index ===
                                                0
                                                    ? "sm:col-span-2 lg:col-span-2"
                                                    : ""
                                            }
                                        `}
                                    >
                                        <div
                                            className={
                                                index ===
                                                0
                                                    ? "relative aspect-[16/8]"
                                                    : "relative aspect-[4/3]"
                                            }
                                        >
                                            <Image
                                                src={
                                                    image.url
                                                }
                                                alt={
                                                    image.altText ??
                                                    project.title
                                                }
                                                fill
                                                sizes={
                                                    index ===
                                                    0
                                                        ? "(max-width: 1024px) 100vw, 66vw"
                                                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                }
                                                className="
                                                    object-cover
                                                    transition-transform
                                                    duration-700
                                                    ease-out
                                                    group-hover:scale-105
                                                "
                                            />
                                        </div>

                                        {/* Image overlay */}

                                        <div
                                            aria-hidden="true"
                                            className="
                                                pointer-events-none
                                                absolute
                                                inset-0
                                                bg-linear-to-t
                                                from-black/30
                                                via-transparent
                                                to-transparent
                                                opacity-0
                                                transition-opacity
                                                duration-300
                                                group-hover:opacity-100
                                            "
                                        />
                                    </motion.div>
                                ),
                            )}
                        </div>

                    </div>
                )}
            </div>
        </section>
    );
}