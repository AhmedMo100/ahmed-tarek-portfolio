"use client";

/**

* @file contact-footer.tsx
* @package src/components/contact
* @description
* Final call-to-action section for the Contact page.
  */

import { motion } from "framer-motion";
import { ArrowRight, FolderGit2, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export function ContactFooter() {
const locale = useLocale();
const t = useTranslations("ContactPage.footer");
const isArabic = locale === "ar";

return (
    <section
        className="
            relative
            mt-16
            mb-12
            overflow-hidden
            px-4
            md:mt-20
            sm:px-6
        "
    >
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
                amount: 0.25,
            }}
            transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="
                group
                relative
                mx-auto
                max-w-4xl
                overflow-hidden
                rounded-3xl
                border
                border-border/60
                bg-card/40
                px-6
                py-12
                text-center
                shadow-sm
                backdrop-blur-sm
                transition-all
                duration-500
                hover:border-primary/20
                hover:shadow-xl
                hover:shadow-primary/5
                sm:px-10
                md:py-16
            "
        >
            {/* Subtle ambient glow */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    h-48
                    w-96
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-primary/[0.06]
                    blur-3xl
                    transition-opacity
                    duration-500
                    group-hover:bg-primary/[0.08]
                "
            />

            {/* Decorative corner */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -bottom-16
                    -right-16
                    h-40
                    w-40
                    rounded-full
                    border
                    border-primary/10
                    transition-transform
                    duration-700
                    group-hover:scale-110
                "
            />

            <div className="relative z-10 flex flex-col items-center">

                {/* Icon */}

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.9,
                    }}
                    whileInView={{
                        opacity: 1,
                        scale: 1,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 0.1,
                    }}
                    className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-primary/20
                        bg-primary/10
                        text-primary
                        shadow-sm
                    "
                >
                    <Sparkles className="h-5 w-5" />
                </motion.div>

                {/* Heading */}

                <motion.h4
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
                        mt-6
                        max-w-2xl
                        text-3xl
                        font-black
                        tracking-tight
                        text-foreground
                        sm:text-4xl
                        md:text-[2.7rem]
                        md:leading-[1.1]
                    "
                >
                    {t("title")}
                </motion.h4>

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
                        delay: 0.25,
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

                {/* CTA */}

                <motion.a
                    href={`/${locale}/projects`}
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
                        delay: 0.35,
                    }}
                    whileHover={{
                        y: -2,
                    }}
                    whileTap={{
                        scale: 0.98,
                    }}
                    className="
                        group/button
                        mt-8
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-primary
                        px-6
                        py-3
                        text-sm
                        font-bold
                        text-primary-foreground
                        shadow-lg
                        shadow-primary/15
                        transition-all
                        duration-300
                        hover:shadow-xl
                        hover:shadow-primary/25
                    "
                >
                    <FolderGit2
                        className="
                            h-4
                            w-4
                            transition-transform
                            duration-300
                            group-hover/button:scale-110
                        "
                    />

                    <span>
                        {t("cta")}
                    </span>

                    <ArrowRight
                        className={`
                            h-4
                            w-4
                            transition-transform
                            duration-300
                            ${
                                isArabic
                                    ? "rotate-180 group-hover/button:-translate-x-1"
                                    : "group-hover/button:translate-x-1"
                            }
                        `}
                    />
                </motion.a>
            </div>
        </motion.div>
    </section>
);

}
