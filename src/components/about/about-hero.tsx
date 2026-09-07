/**

* @file about-hero.tsx
* @package src/components/about
* @description
* Premium About page hero introducing the developer profile
* with localized content and a developer-focused visual identity.
  */

"use client";

import { motion } from "framer-motion";
import {
    ArrowDown,
    ArrowRight,
    Code2,
    Terminal,
} from "lucide-react";

import { useLocale, useTranslations } from "next-intl";

import type { DeveloperProfile } from "@/services/profile";
import { SectionDivider } from "../shared/section-divider";

interface AboutHeroProps {
    profile: DeveloperProfile | null;
}

/**

* Premium About page hero.
*
* Features:
*
* • Localized developer biography
* • Clean typography-focused content area
* • Wide developer terminal visual
* • Subtle primary ambient effects
* • Animated scroll indicator
* • Shared visual divider for design consistency
  */
export function AboutHero({
    profile,
}: AboutHeroProps) {
    const locale = useLocale();

    const t = useTranslations("AboutPage.hero");

    /**
  
    * Determine the current application direction.
      */
    const isArabic = locale === "ar";

    /**
  
    * Resolve the localized developer biography.
      */
    const bio = profile
        ? isArabic
            ? profile.bioAr
            : profile.bioEn
        : "";

    /**
  
    * Smoothly scroll to the next About section.
      */
    const scrollToWhoIAm = () => {
        document
            .getElementById("who-i-am")
            ?.scrollIntoView({
                behavior: "smooth",
            });
    };

    return (<section className="relative flex min-h-[85vh] items-center overflow-hidden px-4 py-20 md:py-24 lg:py-28">

        ```
        {/* ---------------------------------------------------------- */}
        {/* Background Ambient Layer                                   */}
        {/* ---------------------------------------------------------- */}

        <div className="absolute inset-0 -z-20 bg-background" />

        <div className="absolute inset-x-0 top-0 -z-10 h-[65%] bg-linear-to-b from-primary/10 via-primary/5 to-transparent" />

        {/* Primary Ambient Glow */}
        <div
            aria-hidden="true"
            className="
               absolute
               left-[10%]
               top-[20%]
               -z-10
               h-72
               w-72
               rounded-full
               bg-primary/10
               blur-3xl
           "
        />

        {/* Secondary Ambient Glow */}
        <div
            aria-hidden="true"
            className="
               absolute
               right-[5%]
               top-[30%]
               -z-10
               h-96
               w-96
               rounded-full
               bg-primary/5
               blur-3xl
           "
        />

        {/* Decorative Grid */}
        <div
            aria-hidden="true"
            className="
               absolute
               inset-0
               -z-10
               opacity-[0.025]
               [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
               [background-size:48px_48px]
           "
        />

        {/* ---------------------------------------------------------- */}
        {/* Main Content Container                                      */}
        {/* ---------------------------------------------------------- */}

        <div className="container relative z-10 mx-auto max-w-6xl">

            <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:gap-20">

                {/* -------------------------------------------------- */}
                {/* Developer Introduction                             */}
                {/* -------------------------------------------------- */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 28,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                       flex
                       flex-col
                       items-center
                       text-center
                       lg:items-start
                       lg:text-start
                   "
                >

                    {/* Main Heading */}

                    <h1 className="max-w-3xl text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[1.05]">
                        {t("title")}
                    </h1>

                    {/* Decorative Primary Accent */}

                    <motion.div
                        initial={{
                            width: 0,
                        }}
                        animate={{
                            width: 96,
                        }}
                        transition={{
                            duration: 0.7,
                            delay: 0.25,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
                           mt-7
                           h-px
                           bg-linear-to-r
                           from-primary
                           to-primary/10
                       "
                    />

                    {/* Developer Biography */}

                    {bio && (
                        <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
                            {bio}
                        </p>
                    )}

                    {/* Contact Action */}

                    <motion.a
                        href={`/${locale}/contact`}
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
                            delay: 0.35,
                        }}
                        className="
        group
        mt-8
        inline-flex
        items-center
        gap-2
        self-center
        rounded-full
        border
        border-primary/20
        bg-primary/5
        px-5
        py-2.5
        text-sm
        font-semibold
        text-primary
        transition-all
        duration-300
        hover:bg-primary
        hover:text-primary-foreground
        hover:shadow-lg
        lg:self-start
    "
                    >
                        <span>
                            {t("cta")}
                        </span>

                        <ArrowRight
                            className={`
            h-4
            w-4
            transition-transform
            duration-300
            ${isArabic
                                    ? "rotate-180 group-hover:-translate-x-1"
                                    : "group-hover:translate-x-1"
                                }
        `}
                        />
                    </motion.a>

                </motion.div>

                {/* -------------------------------------------------- */}
                {/* Developer Terminal Visual                          */}
                {/* -------------------------------------------------- */}

                <motion.div
                    initial={{
                        opacity: 0,
                        x: isArabic ? -32 : 32,
                        y: 12,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.75,
                        delay: 0.15,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative mx-auto w-full"
                >

                    {/* Background Decorative Frame */}

                    <div
                        aria-hidden="true"
                        className="
                           absolute
                           -inset-3
                           rounded-[2rem]
                           border
                           border-primary/10
                           bg-primary/[0.02]
                       "
                    />

                    {/* Terminal Container */}

                    <div
                        className="
                           relative
                           overflow-hidden
                           rounded-2xl
                           border
                           border-border/70
                           bg-card/80
                           shadow-2xl
                           shadow-black/10
                           backdrop-blur-xl
                           dark:shadow-black/30
                       "
                    >

                        {/* Terminal Top Accent */}

                        <div
                            aria-hidden="true"
                            className="
                               absolute
                               inset-x-0
                               top-0
                               h-px
                               bg-linear-to-r
                               from-transparent
                               via-primary/70
                               to-transparent
                           "
                        />

                        {/* Terminal Header */}

                        <div className="flex items-center justify-between border-b border-border/60 bg-muted/20 px-5 py-4 sm:px-6">

                            {/* Window Controls */}

                            <div className="flex items-center gap-2">

                                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />

                                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />

                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />

                            </div>

                            {/* Terminal Identity */}

                            <div className="flex items-center gap-2 text-xs text-muted-foreground">

                                <Terminal className="h-4 w-4 text-primary" />

                                <span className="hidden sm:inline">
                                    ahmed-tarek.profile
                                </span>

                            </div>

                        </div>

                        {/* Terminal Content */}

                        <div className="relative p-5 font-mono text-xs sm:p-7 sm:text-sm md:p-8">

                            {/* Terminal Background Glow */}

                            <div
                                aria-hidden="true"
                                className="
                                   absolute
                                   right-0
                                   top-0
                                   h-64
                                   w-64
                                   rounded-full
                                   bg-primary/5
                                   blur-3xl
                               "
                            />

                            <div className="relative z-10 space-y-6">

                                {/* Object Declaration */}

                                <div className="flex items-center gap-2">

                                    <span className="text-purple-400">
                                        const
                                    </span>

                                    <span className="text-blue-400">
                                        developer
                                    </span>

                                    <span className="text-muted-foreground">
                                        =
                                    </span>

                                    <span className="text-foreground">
                                        {"{"}
                                    </span>

                                </div>

                                {/* Developer Properties */}

                                <div className="space-y-3 border-s border-primary/20 ps-5 text-muted-foreground">

                                    <p className="flex flex-wrap gap-x-2 gap-y-1">

                                        <span className="text-primary">
                                            name:
                                        </span>

                                        <span className="text-emerald-400">
                                            &quot;Ahmed Tarek&quot;,
                                        </span>

                                    </p>

                                    <p className="flex flex-wrap gap-x-2 gap-y-1">

                                        <span className="text-primary">
                                            role:
                                        </span>

                                        <span className="text-emerald-400">
                                            &quot;Frontend & Full-Stack Engineer&quot;,
                                        </span>

                                    </p>

                                    <p className="flex flex-wrap gap-x-2 gap-y-1">

                                        <span className="text-primary">
                                            focus:
                                        </span>

                                        <span className="text-emerald-400">
                                            &quot;Building Modern Web Experiences&quot;,
                                        </span>

                                    </p>

                                    <p className="flex flex-wrap gap-x-2 gap-y-1">

                                        <span className="text-primary">
                                            stack:
                                        </span>

                                        <span className="text-emerald-400">
                                            &quot;React, Next.js, TypeScript&quot;,
                                        </span>

                                    </p>

                                    <p className="flex flex-wrap gap-x-2 gap-y-1">

                                        <span className="text-primary">
                                            mindset:
                                        </span>

                                        <span className="text-emerald-400">
                                            &quot;Build. Learn. Improve.&quot;
                                        </span>

                                    </p>

                                </div>

                                {/* Object Closure */}

                                <div className="text-foreground">
                                    {"};"}
                                </div>

                                {/* Terminal Command */}

                                <div className="flex items-center gap-2 border-t border-border/50 pt-5 text-emerald-400">

                                    <span className="text-primary">
                                        ➜
                                    </span>

                                    <span>
                                        ready_to_build()
                                    </span>

                                    <span className="h-4 w-px animate-pulse bg-emerald-400" />

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Bottom Decorative Glow */}

                    <div
                        aria-hidden="true"
                        className="
                           absolute
                           -bottom-8
                           -right-8
                           -z-10
                           h-40
                           w-40
                           rounded-full
                           bg-primary/10
                           blur-3xl
                       "
                    />

                </motion.div>

            </div>

            {/* ------------------------------------------------------ */}
            {/* Section Ending Divider                                 */}
            {/* ------------------------------------------------------ */}
            <SectionDivider className="mt-36" />


        </div>

    </section>

    );
}
