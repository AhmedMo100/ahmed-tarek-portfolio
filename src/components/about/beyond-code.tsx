"use client";

/**
 * @file beyond-code.tsx
 * @package src/components/about
 * @description
 * Static personal values section highlighting qualities that shape
 * the developer beyond technical implementation.
 */

import {
    Brain,
    Code2,
    Compass,
    MessageCircle,
    TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function BeyondCode() {
    const t = useTranslations("AboutPage.beyondCode");

    const items = [
        {
            key: "learning",
            icon: TrendingUp,
        },
        {
            key: "curiosity",
            icon: Compass,
        },
        {
            key: "communication",
            icon: MessageCircle,
        },
        {
            key: "growth",
            icon: Brain,
        },
    ] as const;

    return (
        <section
            className="
                relative
                w-full
                overflow-hidden
                bg-background
py-16
md:py-20
            "
        >
            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">

                {/* -------------------------------------------------- */}
                {/* Header                                             */}
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
                        amount: 0.25,
                    }}
                    transition={{
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                        grid
                        gap-6
                        lg:grid-cols-[0.8fr_1.2fr]
                        lg:items-end
                        lg:gap-10
                    "
                >
                    <div>
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
                                mt-4
                                h-px
                                bg-linear-to-r
                                from-primary
                                to-primary/10
                            "
                        />
                    </div>

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
                            delay: 0.2,
                        }}
                        className="
                            max-w-xl
                            text-sm
                            leading-7
                            text-muted-foreground
                            lg:ms-auto
                            sm:text-base
                            sm:leading-8
                        "
                    >
                        {t("description")}
                    </motion.p>
                </motion.div>

                {/* -------------------------------------------------- */}
                {/* Values                                             */}
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
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >
                    {items.map(({ key, icon: Icon }, index) => (
                        <motion.article
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
                                bg-card/25
                                p-5
                                backdrop-blur-sm
                                transition-all
                                duration-300
                                hover:border-primary/20
                                hover:bg-card/50
                                hover:shadow-lg
                                hover:shadow-primary/5
                            "
                        >
                            {/* Hover Glow */}

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

                            {/* Top Row */}

                            <div className="relative flex items-start justify-between">
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

                                {/* Index */}

                                <span
                                    className="
                                        font-mono
                                        text-[10px]
                                        font-medium
                                        tracking-wider
                                        text-muted-foreground/40
                                        transition-colors
                                        duration-300
                                        group-hover:text-primary/60
                                    "
                                >
                                    0{index + 1}
                                </span>
                            </div>

                            {/* Content */}

                            <h3
                                className="
                                    relative
                                    mt-5
                                    text-sm
                                    font-semibold
                                    tracking-tight
                                    text-foreground
                                    transition-colors
                                    duration-300
                                    group-hover:text-primary
                                "
                            >
                                {t(`items.${key}.title`)}
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
                                {t(`items.${key}.description`)}
                            </p>

                            {/* Bottom Accent */}

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
                        </motion.article>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}