"use client";

/**
 * @file experience-journey.tsx
 * @package src/components/about
 * @description
 * Displays professional experience and personal journey milestones
 * using localized, database-driven timelines.
 */

import {
    BriefcaseBusiness,
    Code2,
    GraduationCap,
    MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import type { ProfessionalExperience } from "@/services/experience";
import type { JourneyMilestone } from "@/services/milestone";
import { SectionDivider } from "../shared/section-divider";

interface ExperienceJourneyProps {
    experiences: ProfessionalExperience[];
    milestones: JourneyMilestone[];
    locale: string;
}

export function ExperienceJourney({
    experiences,
    milestones,
    locale,
}: ExperienceJourneyProps) {
    const t = useTranslations("AboutPage.experienceJourney");

    const isArabic = locale === "ar";

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
                        amount: 0.25,
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
                        {t("description")}
                    </motion.p>
                </motion.div>

                {/* -------------------------------------------------- */}
                {/* Professional Experience                            */}
                {/* -------------------------------------------------- */}

                {experiences.length > 0 && (
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
                            amount: 0.15,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.1,
                        }}
                        className="mt-12"
                    >
                        {/* Subsection Header */}

                        <div className="mb-7 flex items-center gap-3">
                            <div
                                className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-primary/15
                                    bg-primary/5
                                    text-primary
                                "
                            >
                                <BriefcaseBusiness className="h-4 w-4" />
                            </div>

                            <h3
                                className="
                                    text-lg
                                    font-semibold
                                    tracking-tight
                                    text-foreground
                                "
                            >
                                {t("experience.title")}
                            </h3>

                            <div
                                className="
                                    h-px
                                    flex-1
                                    bg-linear-to-r
                                    from-border/60
                                    to-transparent
                                "
                            />
                        </div>

                        {/* Experience Timeline */}

                        <div
                            className="
                                relative
                                ms-4
                                border-s
                                border-border/60
                                ps-8
                                md:ms-6
                                md:ps-10
                            "
                        >
                            <div className="space-y-8">
                                {experiences.map((experience) => {
                                    const company = isArabic
                                        ? experience.companyAr
                                        : experience.companyEn;

                                    const role = isArabic
                                        ? experience.roleAr
                                        : experience.roleEn;

                                    const duration = isArabic
                                        ? experience.durationAr
                                        : experience.durationEn;

                                    const description = isArabic
                                        ? experience.descriptionAr
                                        : experience.descriptionEn;

                                    return (
                                        <motion.article
                                            key={experience.id}
                                            initial={{
                                                opacity: 0,
                                                x: isArabic ? 12 : -12,
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                x: 0,
                                            }}
                                            viewport={{
                                                once: true,
                                                amount: 0.2,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            whileHover={{
                                                y: -2,
                                            }}
                                            className="
                                                group
                                                relative
                                            "
                                        >
                                            {/* Timeline Node */}

                                            <div
                                                className="
                                                    absolute
                                                    inset-s-[-2.65rem]
                                                    top-1
                                                    flex
                                                    h-5
                                                    w-5
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    border
                                                    border-primary/30
                                                    bg-background
                                                    transition-colors
                                                    duration-300
                                                    group-hover:border-primary/50
                                                    md:inset-s-[-3.15rem]
                                                "
                                            >
                                                <span
                                                    className="
                                                        h-2
                                                        w-2
                                                        rounded-full
                                                        bg-primary
                                                        transition-transform
                                                        duration-300
                                                        group-hover:scale-125
                                                    "
                                                />
                                            </div>

                                            {/* Experience Card */}

                                            <div
                                                className="
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
                                                    group-hover:border-primary/20
                                                    group-hover:bg-card/50
                                                    group-hover:shadow-lg
                                                    group-hover:shadow-primary/5
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

                                                <div
                                                    className="
                                                        relative
                                                        flex
                                                        flex-col
                                                        gap-3
                                                        sm:flex-row
                                                        sm:items-start
                                                        sm:justify-between
                                                    "
                                                >
                                                    <div>
                                                        <h4
                                                            className="
                                                                text-base
                                                                font-semibold
                                                                tracking-tight
                                                                text-foreground
                                                                transition-colors
                                                                duration-300
                                                                group-hover:text-primary
                                                            "
                                                        >
                                                            {role}
                                                        </h4>

                                                        <p
                                                            className="
                                                                mt-1
                                                                text-sm
                                                                font-medium
                                                                text-muted-foreground
                                                            "
                                                        >
                                                            {company}
                                                        </p>
                                                    </div>

                                                    <span
                                                        className="
                                                            w-fit
                                                            rounded-md
                                                            border
                                                            border-border/50
                                                            bg-muted/40
                                                            px-2.5
                                                            py-1
                                                            text-[11px]
                                                            font-medium
                                                            text-muted-foreground
                                                        "
                                                    >
                                                        {duration}
                                                    </span>
                                                </div>

                                                <p
                                                    className="
                                                        relative
                                                        mt-4
                                                        text-sm
                                                        leading-7
                                                        text-muted-foreground
                                                    "
                                                >
                                                    {description}
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
                                            </div>
                                        </motion.article>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* -------------------------------------------------- */}
                {/* Journey                                             */}
                {/* -------------------------------------------------- */}

                {milestones.length > 0 && (
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
                            amount: 0.15,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.1,
                        }}
                        className="mt-16"
                    >
                        {/* Subsection Header */}

                        <div className="mb-7 flex items-center gap-3">
                            <div
                                className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-primary/15
                                    bg-primary/5
                                    text-primary
                                "
                            >
                                <GraduationCap className="h-4 w-4" />
                            </div>

                            <h3
                                className="
                                    text-lg
                                    font-semibold
                                    tracking-tight
                                    text-foreground
                                "
                            >
                                {t("journey.title")}
                            </h3>

                            <div
                                className="
                                    h-px
                                    flex-1
                                    bg-linear-to-r
                                    from-border/60
                                    to-transparent
                                "
                            />
                        </div>

                        {/* Journey Timeline */}

                        <div
                            className="
                                relative
                                ms-4
                                border-s
                                border-border/60
                                ps-8
                                md:ms-6
                                md:ps-10
                            "
                        >
                            <div className="space-y-7">
                                {milestones.map((milestone) => {
                                    const title = isArabic
                                        ? milestone.titleAr
                                        : milestone.titleEn;

                                    const description = isArabic
                                        ? milestone.descriptionAr
                                        : milestone.descriptionEn;

                                    return (
                                        <motion.article
                                            key={milestone.id}
                                            initial={{
                                                opacity: 0,
                                                x: isArabic ? 12 : -12,
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                x: 0,
                                            }}
                                            viewport={{
                                                once: true,
                                                amount: 0.2,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            whileHover={{
                                                y: -2,
                                            }}
                                            className="
                                                group
                                                relative
                                            "
                                        >
                                            {/* Timeline Node */}

                                            <div
                                                className="
                                                    absolute
                                                    inset-s-[-2.65rem]
                                                    top-1
                                                    flex
                                                    h-5
                                                    w-5
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    border
                                                    border-border/60
                                                    bg-background
                                                    transition-colors
                                                    duration-300
                                                    group-hover:border-primary/40
                                                    md:inset-s-[-3.15rem]
                                                "
                                            >
                                                <span
                                                    className="
                                                        h-2
                                                        w-2
                                                        rounded-full
                                                        bg-muted-foreground
                                                        transition-all
                                                        duration-300
                                                        group-hover:scale-125
                                                        group-hover:bg-primary
                                                    "
                                                />
                                            </div>

                                            {/* Milestone Card */}

                                            <div
                                                className="
                                                    relative
                                                    overflow-hidden
                                                    rounded-xl
                                                    border
                                                    border-border/40
                                                    bg-card/20
                                                    p-5
                                                    backdrop-blur-sm
                                                    transition-all
                                                    duration-300
                                                    group-hover:border-primary/20
                                                    group-hover:bg-card/45
                                                    group-hover:shadow-lg
                                                    group-hover:shadow-primary/5
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

                                                <div
                                                    className="
                                                        relative
                                                        flex
                                                        flex-wrap
                                                        items-center
                                                        gap-2
                                                    "
                                                >
                                                    {milestone.year && (
                                                        <span
                                                            className="
                                                                inline-flex
                                                                items-center
                                                                gap-1.5
                                                                rounded-md
                                                                border
                                                                border-primary/15
                                                                bg-primary/5
                                                                px-2
                                                                py-1
                                                                text-[11px]
                                                                font-semibold
                                                                text-primary
                                                            "
                                                        >
                                                            <MapPin className="h-3 w-3" />
                                                            {milestone.year}
                                                        </span>
                                                    )}

                                                    <h4
                                                        className="
                                                            text-sm
                                                            font-semibold
                                                            tracking-tight
                                                            text-foreground
                                                            transition-colors
                                                            duration-300
                                                            group-hover:text-primary
                                                        "
                                                    >
                                                        {title}
                                                    </h4>
                                                </div>

                                                <p
                                                    className="
                                                        relative
                                                        mt-3
                                                        text-sm
                                                        leading-7
                                                        text-muted-foreground
                                                    "
                                                >
                                                    {description}
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
                                            </div>
                                        </motion.article>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ------------------------------------------------------ */}
                {/* Section Ending Divider                                 */}
                {/* ------------------------------------------------------ */}
                <SectionDivider className="mt-36" />

            </div>
        </section>
    );
}