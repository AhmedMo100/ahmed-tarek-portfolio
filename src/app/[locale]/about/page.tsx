/**
 * @file page.tsx
 * @package src/app/[locale]/about
 * @description
 * Localized About page orchestrating developer profile,
 * professional experience, journey milestones, and engineering principles.
 */

import { getProfile } from "@/services/profile";
import { getExperiences } from "@/services/experience";
import { getMilestones } from "@/services/milestone";
import { getQualityStandards } from "@/services/quality";

import { AboutHero } from "@/components/about/about-hero";
import { WhoIAm } from "@/components/about/who-i-am";
import { ExperienceJourney } from "@/components/about/experience-journey";
import { TechnicalPhilosophy } from "@/components/about/technical-philosophy";
import { BeyondCode } from "@/components/about/beyond-code";
import { AboutCTA } from "@/components/about/about-cta";

import { getLocale } from "next-intl/server";

export default async function AboutPage() {
    const locale = await getLocale();

    const [
        profile,
        experiences,
        milestones,
        qualityStandards,
    ] = await Promise.all([
        getProfile(),
        getExperiences(),
        getMilestones(),
        getQualityStandards(),
    ]);

    return (
        <main className="min-h-screen bg-background">
            <AboutHero
                profile={profile}
            />

            <WhoIAm
                profile={profile}
                locale={locale}
            />

            <ExperienceJourney
                experiences={experiences}
                milestones={milestones}
                locale={locale}
            />

            <TechnicalPhilosophy
                standards={qualityStandards}
                locale={locale}
            />

            <BeyondCode />

            <AboutCTA />
        </main>
    );
}