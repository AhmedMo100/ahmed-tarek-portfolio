"use client";

/**
 * @file who-i-am.tsx
 * @package src/components/about
 * @description
 * Personal introduction section combining the developer profile narrative
 * with static professional highlights.
 */

import {
    BrainCircuit,
    Code2,
    Lightbulb,
    Rocket,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import type { DeveloperProfile } from "@/services/profile";
import { SectionDivider } from "../shared/section-divider";

interface WhoIAmProps {
    profile: DeveloperProfile | null;
    locale: string;
}

export function WhoIAm({
    profile,
    locale,
}: WhoIAmProps) {
    const t = useTranslations("AboutPage.whoIAm");

    const isArabic = locale === "ar";

    const aboutText = profile
        ? isArabic
            ? profile.aboutTextAr
            : profile.aboutTextEn
        : "";

    const highlights = [
        {
            key: "problemSolver",
            icon: BrainCircuit,
        },
        {
            key: "productMinded",
            icon: Rocket,
        },
        {
            key: "continuousLearner",
            icon: Lightbulb,
        },
    ] as const;

    return (
        <section
            id="who-i-am"
            className="
                relative
                w-full
                overflow-hidden
                bg-background
                py-16
                md:py-20
            "
        >

            {/* ------------------------------------------------------ */}
            {/* Main Content                                           */}
            {/* ------------------------------------------------------ */}

            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">

                {/* -------------------------------------------------- */}
                {/* Section Header                                     */}
                {/* -------------------------------------------------- */}

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
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mx-auto max-w-3xl text-center"
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
                        }}
                        className="
                            inline-flex
                            items-center
                            rounded-md
                            border
                            border-primary/20
                            bg-primary/5
                            px-2.5
                            py-1
                            text-[11px]
                            font-semibold
                            uppercase
                            tracking-wider
                            text-primary
                        "
                    >
                        {t("eyebrow")}
                    </motion.span>

                    {/* Title */}

                    <h2
                        className="
                            mt-4
                            text-3xl
                            font-bold
                            tracking-tight
                            text-foreground
                            sm:text-4xl
                        "
                    >
                        {t("title")}
                    </h2>

                    {/* Section Accent */}

                    <motion.div
                        initial={{
                            width: 0,
                        }}
                        whileInView={{
                            width: 64,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.15,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
                            mx-auto
                            mt-4
                            h-px
                            bg-linear-to-r
                            from-primary
                            to-primary/10
                        "
                    />

                    {/* About */}

                    {aboutText && (
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
                                max-w-2xl
                                text-sm
                                leading-7
                                text-muted-foreground
                                sm:text-base
                                sm:leading-8
                            "
                        >
                            {aboutText}
                        </motion.p>
                    )}
                </motion.div>

                {/* -------------------------------------------------- */}
                {/* Highlights                                         */}
                {/* -------------------------------------------------- */}

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                    className="
                        mt-10
                        grid
                        gap-4
                        md:grid-cols-3
                    "
                >
                    {highlights.map(
                        ({
                            key,
                            icon: Icon,
                        }) => (
                            <motion.div
                                key={key}
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.55,
                                            ease: [0.22, 1, 0.36, 1],
                                        },
                                    },
                                }}
                                whileHover={{
                                    y: -4,
                                }}
                                transition={{
                                    duration: 0.25,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-xl
                                    border
                                    border-border/40
                                    bg-card/30
                                    p-5
                                    backdrop-blur-sm
                                    transition-all
                                    duration-300
                                    hover:border-primary/20
                                    hover:bg-card/60
                                    hover:shadow-xl
                                    hover:shadow-primary/5
                                "
                            >
                                {/* Card Glow */}

                                <div
                                    aria-hidden="true"
                                    className="
                                        pointer-events-none
                                        absolute
                                        -right-12
                                        -top-12
                                        h-28
                                        w-28
                                        rounded-full
                                        bg-primary/10
                                        blur-3xl
                                        opacity-0
                                        transition-opacity
                                        duration-500
                                        group-hover:opacity-100
                                    "
                                />

                                {/* Icon */}

                                <motion.div
                                    whileHover={{
                                        scale: 1.06,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    }}
                                    className="
                                        relative
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-lg
                                        border
                                        border-border/50
                                        bg-muted/70
                                        text-muted-foreground
                                        transition-all
                                        duration-300
                                        group-hover:border-primary/25
                                        group-hover:bg-primary/10
                                        group-hover:text-primary
                                    "
                                >
                                    <Icon className="h-4 w-4" />
                                </motion.div>

                                {/* Content */}

                                <h3
                                    className="
                                        relative
                                        mt-4
                                        text-sm
                                        font-semibold
                                        tracking-tight
                                        text-foreground
                                        transition-colors
                                        duration-300
                                        group-hover:text-primary
                                    "
                                >
                                    {t(`highlights.${key}.title`)}
                                </h3>

                                <p
                                    className="
                                        relative
                                        mt-2
                                        text-xs
                                        leading-relaxed
                                        text-muted-foreground
                                    "
                                >
                                    {t(`highlights.${key}.description`)}
                                </p>

                                {/* Bottom Hover Accent */}

                                <div
                                    aria-hidden="true"
                                    className="
                                        absolute
                                        inset-x-0
                                        bottom-0
                                        h-px
                                        origin-center
                                        scale-x-0
                                        bg-linear-to-r
                                        from-transparent
                                        via-primary
                                        to-transparent
                                        transition-transform
                                        duration-500
                                        group-hover:scale-x-100
                                    "
                                />
                            </motion.div>
                        )
                    )}
                </motion.div>

                {/* ------------------------------------------------------ */}
                {/* Section Ending Divider                                 */}
                {/* ------------------------------------------------------ */}
                <SectionDivider className="mt-36" />

            </div>
        </section>
    );
}