"use client";

/**
 * @file about-cta.tsx
 * @package src/components/about
 * @description
 * Final call-to-action section for the About page.
 */

import {
    ArrowRight,
    FolderGit2,
    MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

export function AboutCTA() {
    const locale = useLocale();
    const t = useTranslations("AboutPage.cta");

    const isArabic = locale === "ar";

    return (
        <section
            className="
                relative
                w-full
                overflow-hidden
                bg-background
                py-20
                md:py-28
            "
        >
            {/* ------------------------------------------------------ */}
            {/* Background                                             */}
            {/* ------------------------------------------------------ */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-linear-to-b
                    from-primary/[0.035]
                    via-background
                    to-background
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-72
                    w-72
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-primary/[0.06]
                    blur-[100px]
                "
            />

            {/* ------------------------------------------------------ */}
            {/* Content                                                */}
            {/* ------------------------------------------------------ */}

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
                    amount: 0.3,
                }}
                transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="
                    relative
                    z-10
                    mx-auto
                    max-w-3xl
                    px-4
                    text-center
                    sm:px-6
                "
            >
                {/* Eyebrow */}

                <motion.span
                    initial={{
                        opacity: 0,
                        scale: 0.96,
                    }}
                    whileInView={{
                        opacity: 1,
                        scale: 1,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.45,
                        delay: 0.05,
                    }}
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-primary/20
                        bg-primary/5
                        px-3
                        py-1.5
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-primary
                    "
                >
                    <MessageCircle className="h-3.5 w-3.5" />

                    {t("eyebrow")}
                </motion.span>

                {/* Heading */}

                <h2
                    className="
                        mx-auto
                        mt-5
                        max-w-2xl
                        text-3xl
                        font-bold
                        tracking-tight
                        text-foreground
                        sm:text-4xl
                        md:text-5xl
                        md:leading-[1.1]
                    "
                >
                    {t("title")}
                </h2>

                {/* Description */}

                <motion.p
                    initial={{
                        opacity: 0,
                        y: 12,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.55,
                        delay: 0.15,
                    }}
                    className="
                        mx-auto
                        mt-5
                        max-w-xl
                        text-sm
                        leading-7
                        text-muted-foreground
                        sm:text-base
                        sm:leading-8
                    "
                >
                    {t("description")}
                </motion.p>

                {/* Actions */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 12,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.55,
                        delay: 0.25,
                    }}
                    className="
                        mt-8
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-3
                        sm:flex-row
                    "
                >
                    {/* Primary Action */}

                    <a
                        href={`/${locale}/contact`}
                        className="
                            group
                            inline-flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-full
                            bg-primary
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-primary-foreground
                            shadow-lg
                            shadow-primary/10
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:shadow-xl
                            hover:shadow-primary/20
                            sm:w-auto
                        "
                    >
                        <MessageCircle
                            className="
                                h-4
                                w-4
                                transition-transform
                                duration-300
                                group-hover:scale-110
                            "
                        />

                        <span>
                            {t("button")}
                        </span>

                        <ArrowRight
                            className={`
                                h-4
                                w-4
                                transition-transform
                                duration-300
                                ${
                                    isArabic
                                        ? "rotate-180 group-hover:-translate-x-1"
                                        : "group-hover:translate-x-1"
                                }
                            `}
                        />
                    </a>

                    {/* Secondary Action */}

                    <a
                        href={`/${locale}/projects`}
                        className="
                            group
                            inline-flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-full
                            border
                            border-border/70
                            bg-card/30
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-foreground
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:border-primary/30
                            hover:bg-primary/5
                            hover:text-primary
                            sm:w-auto
                        "
                    >
                        <FolderGit2
                            className="
                                h-4
                                w-4
                                transition-transform
                                duration-300
                                group-hover:scale-110
                            "
                        />

                        <span>
                            {t("secondaryButton")}
                        </span>
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}