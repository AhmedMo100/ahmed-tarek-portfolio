/**
 * @file technical-philosophy.tsx
 * @package src/components/about
 * @description
 * Displays the developer's engineering principles and technical standards
 * using localized database-driven quality standards.
 */

import * as Icons from "lucide-react";
import { getTranslations } from "next-intl/server";

import type { QualityStandard } from "@/services/quality";
import { SectionDivider } from "../shared/section-divider";

interface TechnicalPhilosophyProps {
    standards: QualityStandard[];
    locale: string;
}

export async function TechnicalPhilosophy({
    standards,
    locale,
}: TechnicalPhilosophyProps) {
    const t = await getTranslations(
        "AboutPage.technicalPhilosophy"
    );

    const isArabic = locale === "ar";

    if (standards.length === 0) {
        return null;
    }

    return (
        <section className="relative w-full overflow-hidden bg-background py-20 md:py-24">
            {/* Subtle Background Accent */}
            <div className="absolute bottom-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

            <div className="mx-auto max-w-5xl px-4 sm:px-6">

                {/* -------------------------------------------------- */}
                {/* Section Header                                     */}
                {/* -------------------------------------------------- */}

                <div className="mx-auto max-w-2xl text-center">
                    <span className="inline-flex items-center rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                        {t("eyebrow")}
                    </span>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {t("title")}
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                        {t("description")}
                    </p>
                </div>

                {/* -------------------------------------------------- */}
                {/* Engineering Principles                            */}
                {/* -------------------------------------------------- */}

                <div className="mt-12">
                    <div className="mb-6 flex items-center gap-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {t("principles")}
                        </span>

                        <div className="h-px flex-1 bg-linear-to-r from-border/60 to-transparent" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {standards.map((standard) => {
                            const title = isArabic
                                ? standard.titleAr
                                : standard.titleEn;

                            const description = isArabic
                                ? standard.descriptionAr
                                : standard.descriptionEn;

                            const Icon =
                                (Icons[
                                    standard.icon as keyof typeof Icons
                                ] ||
                                    Icons.Code2) as React.ComponentType<{
                                        className?: string;
                                    }>;

                            return (
                                <article
                                    key={standard.id}
                                    className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-card/60"
                                >
                                    {/* Accent Line */}
                                    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                    {/* Icon */}
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-muted text-muted-foreground transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/10 group-hover:text-primary">
                                        <Icon className="h-4.5 w-4.5" />
                                    </div>

                                    {/* Content */}
                                    <div className="mt-5">
                                        <h3 className="text-sm font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                                            {title}
                                        </h3>

                                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                            {description}
                                        </p>
                                    </div>

                                    {/* Index */}
                                    <span className="absolute bottom-4 inset-e-5 font-mono text-[10px] text-muted-foreground/30 transition-colors group-hover:text-primary/30">
                                        {String(
                                            standards.indexOf(standard) + 1
                                        ).padStart(2, "0")}
                                    </span>
                                </article>
                            );
                        })}
                    </div>
                </div>

                {/* ------------------------------------------------------ */}
                                {/* Section Ending Divider                                 */}
                                {/* ------------------------------------------------------ */}
                                <SectionDivider className="mt-36" />

            </div>
        </section>
    );
}