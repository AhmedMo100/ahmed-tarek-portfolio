
/**
 * @file tech-stack.tsx
 * @package src/components/home
 * @preview Compact, production-grade micro-grid with responsive interactions.
 */

import { getTechStack, TechSkill } from "@/services/skills";
import { getTranslations, getLocale } from "next-intl/server";
import * as Icons from "lucide-react";
import { SectionDivider } from "../shared/section-divider";

export async function TechStackGrid() {
    const t = await getTranslations("TechStack");
    const locale = await getLocale();
    const isArabic = locale === "ar";

    const skills: TechSkill[] = await getTechStack();
    const categories = ["FRONTEND", "BACKEND", "TOOLS"] as const;

    return (
        <section className="relative w-full overflow-hidden bg-background py-16 sm:py-20 md:py-24">
            {/* Subtle Background Accent */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 end-1/4 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl sm:h-72 sm:w-72"
            />

            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                {/* Section Header */}
                <div className="mx-auto mb-10 flex max-w-xl flex-col items-center space-y-2 text-center sm:mb-12">
                    <h2 className="bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
                        {t("title")}
                    </h2>

                    <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Categories */}
                <div className="space-y-8 sm:space-y-10">
                    {categories.map((category) => {
                        const filteredSkills = skills.filter(
                            (skill) => skill.category === category
                        );

                        if (filteredSkills.length === 0) return null;

                        return (
                            <div key={category} className="space-y-3 sm:space-y-4">
                                {/* Category Divider */}
                                <div className="flex min-w-0 items-center gap-2">
                                    <h3 className="shrink-0 rounded-md border border-border/40 bg-muted/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-xs sm:tracking-wider">
                                        {t(`categories.${category}`)}
                                    </h3>

                                    <div className="h-px min-w-0 flex-1 bg-linear-to-r from-border/60 to-transparent rtl:bg-linear-to-l" />
                                </div>

                                {/* Skills Grid */}
                                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
                                    {filteredSkills.map((skill) => {
                                        const targetName = isArabic
                                            ? skill.nameAr
                                            : skill.nameEn;

                                        const targetDescription = isArabic
                                            ? skill.descriptionAr
                                            : skill.descriptionEn;

                                        const LucideIcon =
                                            (Icons[
                                                skill.icon as keyof typeof Icons
                                            ] ||
                                                Icons.Terminal) as React.ComponentType<{
                                                    className?: string;
                                                }>;

                                        return (
                                            <div
                                                key={skill.id}
                                                className="
                                                    group
                                                    relative
                                                    flex
                                                    min-w-0
                                                    items-start
                                                    gap-3
                                                    rounded-xl
                                                    border
                                                    border-border/40
                                                    bg-card/30
                                                    p-3
                                                    transition-all
                                                    duration-300
                                                    hover:-translate-y-1
                                                    hover:border-primary/25
                                                    hover:bg-card/70
                                                    hover:shadow-[0_8px_30px_-15px_var(--primary)]
                                                    sm:p-3.5
                                                "
                                            >
                                                {/* Icon */}
                                                <div
                                                    className="
                                                        flex
                                                        h-8
                                                        w-8
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-md
                                                        border
                                                        border-border/50
                                                        bg-muted
                                                        text-muted-foreground
                                                        transition-all
                                                        duration-300
                                                        group-hover:border-primary/20
                                                        group-hover:bg-primary/10
                                                        group-hover:text-primary
                                                        sm:h-9
                                                        sm:w-9
                                                    "
                                                >
                                                    <LucideIcon className="h-4 w-4 stroke-[2]" />
                                                </div>

                                                {/* Content */}
                                                <div className="min-w-0 space-y-0.5">
                                                    <h4 className="truncate text-sm font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                                                        {targetName}
                                                    </h4>

                                                    <p className="line-clamp-2 text-xs font-normal leading-relaxed text-muted-foreground">
                                                        {targetDescription}
                                                    </p>
                                                </div>

                                                {/* Hover Accent */}
                                                <div
                                                    aria-hidden="true"
                                                    className="
                                                        pointer-events-none
                                                        absolute
                                                        bottom-0
                                                        start-4
                                                        h-px
                                                        w-0
                                                        bg-primary
                                                        opacity-0
                                                        transition-all
                                                        duration-300
                                                        group-hover:w-10
                                                        group-hover:opacity-60
                                                    "
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* About CTA */}
                <div className="mt-12 flex justify-center pt-2 sm:mt-14">
                    <a
                        href={`/${locale}/about`}
                        className="
                            group
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-primary/25
                            bg-primary/5
                            px-5
                            py-3
                            text-xs
                            font-semibold
                            text-primary
                            shadow-sm
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:border-primary/50
                            hover:bg-primary
                            hover:text-primary-foreground
                            hover:shadow-[0_8px_30px_-10px_var(--primary)]
                            active:scale-95
                            sm:px-6
                            sm:py-3.5
                            sm:text-sm
                        "
                    >
                        <span>{t("cta")}</span>

                        <Icons.ArrowRight
                            className="
                                h-3.5
                                w-3.5
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                                rtl:rotate-180
                                rtl:group-hover:-translate-x-1
                            "
                        />
                    </a>
                </div>

            </div>
        </section>
    );
}

