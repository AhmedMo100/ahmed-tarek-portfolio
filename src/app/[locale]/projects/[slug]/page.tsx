/**
 * @file page.tsx
 * @package src/app/[locale]/projects/[slug]
 * @description
 * Single project details page.
 */

import { notFound } from "next/navigation";

import { ProjectsService } from "@/services/projects";

import { ProjectHero } from "@/components/project/project-hero";
import { ProjectOverview } from "@/components/project/project-overview";
import { ProjectStoryShowcase } from "@/components/project/project-story-showcase";
import { ProjectFeedback } from "@/components/project/project-feedback";
import { ProjectRelated } from "@/components/project/project-related";

interface Props {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export async function generateMetadata({
    params,
}: Props) {
    const { locale, slug } = await params;

    const project =
        await ProjectsService.getProjectBySlug(
            slug,
            locale,
        );

    if (!project) {
        return {};
    }

    return {
        title: project.title,
        description: project.description,
    };
}

export default async function ProjectPage({
    params,
}: Props) {
    const { locale, slug } = await params;

    const project =
        await ProjectsService.getProjectBySlug(
            slug,
            locale,
        );

    if (!project) {
        notFound();
    }

    return (
        <main className="relative overflow-hidden">
            {/* ============================================================
                01. PROJECT HERO
                ============================================================ */}

            <ProjectHero project={project} />

            {/* ============================================================
                02. PROJECT OVERVIEW
                ============================================================ */}

            <ProjectOverview project={project} />

            {/* ============================================================
                03. STORY & SHOWCASE
                ============================================================ */}

            <ProjectStoryShowcase
                project={project}
            />

            {/* ============================================================
                04. LINKS & FEEDBACK
                ============================================================ */}

            <ProjectFeedback
                project={project}
            />

            {/* ============================================================
                05. RELATED PROJECTS & CTA
                ============================================================ */}

            <ProjectRelated
                project={project}
                locale={locale}
            />
        </main>
    );
}