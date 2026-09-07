
/**
 * @file hero.tsx
 * @package src/components/home
 * @preview Premium developer Hero Section with a futuristic HUD-style
 * profile composition and technical visual elements.
 */

"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { Images } from "@/types";
import { SectionDivider } from "@/components/shared/section-divider";

export function Hero() {
    const t = useTranslations("Hero");
    const locale = useLocale();

    const currentHeroImage =
        locale === "ar" ? Images.hero.ar : Images.hero.en;

    return (
        <section className="relative w-full overflow-hidden pt-16 md:pt-24">

            {/* Ambient Primary Glow */}
            <div className="absolute -top-24 left-1/4 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute top-20 right-1/4 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

            {/* Technical Grid */}
            <div
                className="
                    absolute inset-0 -z-20
                    opacity-[0.035] dark:opacity-[0.06]
                    [background-image:linear-gradient(var(--primary)_1px,transparent_1px),linear-gradient(90deg,var(--primary)_1px,transparent_1px)]
                    [background-size:48px_48px]
                    [mask-image:linear-gradient(to_bottom,black,transparent_88%)]
                "
            />

            {/* Main Hero */}
            <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-10 md:grid-cols-2 md:pb-24">

                {/* Text */}
                <div className="z-10 flex flex-col items-start gap-5 text-start">

                    <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-primary uppercase">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
                        {t("badge")}
                    </div>

                    <h1
                        className="
                            bg-linear-to-r
                            from-foreground
                            via-foreground
                            to-primary
                            bg-clip-text
                            text-4xl
                            font-extrabold
                            tracking-tight
                            text-transparent
                            lg:text-5xl
                        "
                    >
                        {t("greeting")}
                    </h1>

                    <p className="max-w-xl text-base font-normal leading-relaxed text-muted-foreground md:text-lg">
                        {t("description")}
                    </p>

                </div>

                {/* HUD Visual */}
                <div className="relative flex h-80 w-full items-center justify-center md:h-105">

                    {/* Ambient Glow */}
                    <div className="absolute h-64 w-64 rounded-full bg-primary/15 blur-3xl md:h-80 md:w-80" />

                    {/* HUD Frame */}
                    <div className="relative h-72 w-64 md:h-88 md:w-80">

                        {/* Outer Technical Frame */}
                        <div
                            className="
                                absolute inset-0
                                border border-primary/20
                                bg-primary/[0.025]
                                shadow-[0_0_80px_-30px_var(--primary)]
                                backdrop-blur-[2px]
                            "
                        />

                        {/* Top Left Corner */}
                        <span className="absolute -left-px -top-px h-12 w-12 border-l-2 border-t-2 border-primary" />

                        {/* Top Right Corner */}
                        <span className="absolute -right-px -top-px h-12 w-12 border-r-2 border-t-2 border-primary" />

                        {/* Bottom Left Corner */}
                        <span className="absolute -bottom-px -left-px h-12 w-12 border-b-2 border-l-2 border-primary" />

                        {/* Bottom Right Corner */}
                        <span className="absolute -bottom-px -right-px h-12 w-12 border-b-2 border-r-2 border-primary" />

                        {/* Inner Frame */}
                        <div
                            className="
                                absolute inset-4
                                border border-primary/10
                                bg-background/20
                            "
                        />

                        {/* Image Background */} <div className=" absolute inset-3 overflow-hidden bg-linear-to-b from-primary/15 via-primary/5 to-background " > <Image src={currentHeroImage} alt="Ahmed Tarek Profile Photo" fill priority sizes="(max-width: 768px) 280px, 360px" className=" object-contain object-bottom scale-[1.12] animate-fade-in rtl:-scale-x-100 drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_15px_30px_rgba(255,255,255,0.06)] " /> {/* Image Scan Line */} <div className=" absolute left-0 right-0 top-1/3 h-px bg-primary/30 shadow-[0_0_12px_var(--primary)] animate-pulse " /> </div>

                        {/* Technical Side Markers */}
                        <div className="absolute -right-8 top-1/4 flex flex-col gap-1.5 md:-right-12">
                            <span className="h-px w-6 bg-primary/40" />
                            <span className="h-px w-3 bg-primary/25" />
                            <span className="h-px w-8 bg-primary/50" />
                        </div>

                        <div className="absolute -left-8 bottom-1/4 flex flex-col gap-1.5 md:-left-12">
                            <span className="h-px w-8 bg-primary/50" />
                            <span className="h-px w-3 bg-primary/25" />
                            <span className="h-px w-6 bg-primary/40" />
                        </div>

                        {/* Status Indicator */} <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-primary/20 bg-background/90 px-4 py-1.5 text-[10px] font-medium tracking-wider text-primary shadow-lg backdrop-blur-md"> <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" /> {t("craftingDigitalExperiences")} </div>

                    </div>
                </div>
            </div>

            {/* ------------------------------------------------------ */}
            {/* Section Ending Divider                                 */}
            {/* ------------------------------------------------------ */}
            <SectionDivider className="mt-8" />

        </section>
    );
}

