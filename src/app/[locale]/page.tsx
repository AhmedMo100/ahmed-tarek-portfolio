/**
 * @file page.tsx
 * @package src/app/[locale]
 * @preview Server-rendered localized Home page composing the primary landing sections.
 */

import { Hero } from "@/components/home/hero";
import { ProjectWorkspace } from "@/components/home/projects-workspace";
import { TechStackGrid } from "@/components/home/tech-stack";
import { WorkspaceCta } from "@/components/shared/workspace-cta";

import { ProjectsService } from "@/services/projects";

import type { LocalizedPageProps } from "@/types";

/**
 * Localized Home page.
 *
 * Responsible for orchestrating the landing page sections while
 * resolving all required server-side data before rendering.
 *
 * @function HomePage
 * @param {LocalizedPageProps} props - Localized route parameters.
 * @returns {Promise<React.JSX.Element>} Fully rendered Home page.
 */
export default async function HomePage({
    params,
}: LocalizedPageProps) {

    /**
     * Resolve the active locale.
     */
    const { locale } = await params;

    /**
     * Retrieve featured projects for the interactive workspace.
     */
    const featuredProjects =
        await ProjectsService.getFeaturedProjects(locale);

    return (
        <>

            {/* -------------------------------------------------------------- */}
            {/* Hero Section                                                   */}
            {/* -------------------------------------------------------------- */}

            <Hero />

            {/* -------------------------------------------------------------- */}
            {/* Project Workspace                                               */}
            {/* -------------------------------------------------------------- */}

            <ProjectWorkspace
                initialProjects={featuredProjects}
            />

            {/* -------------------------------------------------------------- */}
            {/* Technology Stack                                               */}
            {/* -------------------------------------------------------------- */}

            <TechStackGrid />

            {/* -------------------------------------------------------------- */}
            {/* Workspace CTA                                                   */}
            {/* -------------------------------------------------------------- */}

            <WorkspaceCta />

        </>
    );
}