
/**
 * @file project-hero.tsx
 * @package src/components/project
 * @description
 * Full-width project hero using the project cover image as
 * the visual background.
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowUpRight,
    ExternalLink,
    Heart,
    Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import type { LocalizedProject } from "@/services/projects";

interface ProjectHeroProps {
    project: LocalizedProject;
}

export function ProjectHero({
    project,
}: ProjectHeroProps) {
    const locale = useLocale();
    const t = useTranslations("projects.details");

    const isArabic = locale.startsWith("ar");

    return (
        <section className="relative isolate min-h-[720px] overflow-hidden sm:min-h-[760px] lg:min-h-[820px]">
            {/* ============================================================
                BACKGROUND IMAGE
                ============================================================ */}

            <div className="absolute inset-0 -z-20">
                <Image
                    src={project.coverImage}
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />
            </div>

            {/* ============================================================
                OVERLAYS
                ============================================================ */}

            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-black/60"
            />

            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-linear-to-b from-black/75 via-black/55 to-background"
            />

            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-linear-to-r from-black/25 via-transparent to-black/25"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-125 w-125 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
            />

            {/* ============================================================
                CONTENT
                ============================================================ */}

            <div className="mx-auto flex min-h-[720px] w-full max-w-6xl items-center px-4 py-28 sm:min-h-[760px] sm:px-6 sm:py-32 lg:min-h-[820px] lg:px-8">
                <div className="mx-auto w-full max-w-4xl text-center">

                    {/* ====================================================
                        BREADCRUMB
                        ==================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 12,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                        className="mb-8 flex items-center justify-center gap-2 text-xs font-medium text-white/60 sm:text-sm"
                    >
                        <Link
                            href={`/${locale}/projects`}
                            className="transition-colors hover:text-white"
                        >
                            {t("breadcrumb")}
                        </Link>

                        <span
                            aria-hidden="true"
                            className="text-white/30"
                        >
                            /
                        </span>

                        <span className="max-w-55 truncate text-white/80">
                            {project.title}
                        </span>
                    </motion.div>

                    {/* ====================================================
                        EYEBROW
                        ==================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 16,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.55,
                            delay: 0.05,
                        }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-md"
                    >
                        <Sparkles className="h-3.5 w-3.5 text-primary" />

                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-sm">
                            {t("eyebrow")}
                        </span>
                    </motion.div>

                    {/* ====================================================
                        TITLE
                        ==================================================== */}

                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 24,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.7,
                            delay: 0.1,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                        className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                        {project.title}
                    </motion.h1>

                    {/* ====================================================
                        ACCENT LINE
                        ==================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            scaleX: 0,
                        }}
                        animate={{
                            opacity: 1,
                            scaleX: 1,
                        }}
                        transition={{
                            duration: 0.7,
                            delay: 0.25,
                        }}
                        className="mx-auto mt-7 h-1 w-20 origin-center rounded-full bg-primary shadow-[0_0_20px_var(--primary)]"
                    />

                    {/* ====================================================
                        DESCRIPTION
                        ==================================================== */}

                    <motion.p
                        initial={{
                            opacity: 0,
                            y: 18,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.3,
                        }}
                        className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg sm:leading-9"
                    >
                        {project.description}
                    </motion.p>

                    {/* ====================================================
                        TECHNOLOGIES
                        ==================================================== */}

                    {project.technologies.length >
                        0 && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 16,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.4,
                            }}
                            className="mt-8 flex flex-wrap items-center justify-center gap-2"
                        >
                            {project.technologies.map(
                                (technology) => (
                                    <span
                                        key={
                                            technology
                                        }
                                        className="rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md transition-colors duration-300 hover:border-primary/40 hover:text-white"
                                    >
                                        {
                                            technology
                                        }
                                    </span>
                                ),
                            )}
                        </motion.div>
                    )}

                    {/* ====================================================
                        ACTIONS
                        ==================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 18,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.5,
                        }}
                        className="mt-9 flex flex-wrap items-center justify-center gap-3"
                    >
                        {/* Live Demo */}

                        {project.liveUrl && (
                            <Link
                                href={
                                    project.liveUrl
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                            >
                                <ExternalLink className="h-4 w-4" />

                                {t(
                                    "links.liveDemo",
                                )}

                                <ArrowUpRight
                                    className={`h-4 w-4 transition-transform duration-300 ${
                                        isArabic
                                            ? "group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                                            : "group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                                    }`}
                                />
                            </Link>
                        )}

                        {/* Frontend Repository */}

                        {project.githubFront && (
                            <Link
                                href={
                                    project.githubFront
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/12"
                            >
                                <FaGithub className="h-4 w-4" />

                                {t(
                                    "links.frontend",
                                )}
                            </Link>
                        )}

                        {/* Like */}

                        <button
                            type="button"
                            aria-label={t(
                                "interaction.like",
                            )}
                            className={`group inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold backdrop-blur-md transition-all duration-300 ${
                                project.isLiked
                                    ? "border-primary/40 bg-primary/15 text-primary"
                                    : "border-white/15 bg-white/8 text-white/75 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                            }`}
                        >
                            <Heart
                                className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${
                                    project.isLiked
                                        ? "fill-current"
                                        : ""
                                }`}
                            />

                            <span>
                                {
                                    project.likes
                                }
                            </span>
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* ============================================================
                BOTTOM FADE
                ============================================================ */}

            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent"
            />
        </section>
    );
}

