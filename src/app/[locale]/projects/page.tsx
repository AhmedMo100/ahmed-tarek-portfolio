/**
 * @file page.tsx
 * @package src/app/[locale]/projects
 * @description
 * Main Projects page.
 * Handles hero, category filters, and project grid.
 * Server-side rendered with localized data fetching.
 */


import { ProjectsHero } from "@/components/projects/projects-hero";
import { ProjectFilters } from "@/components/projects/project-filters";
import { ProjectsGrid } from "@/components/projects/projects-grid";

import { ProjectsService } from "@/services/projects";

import {
    getLocale,
    getTranslations,
} from "next-intl/server";



type ProjectCategory =
    | "all"
    | "fullstack"
    | "frontend"
    | "backend"
    | "saas"
    | "featured";



interface ProjectsPageProps {

    searchParams:
        Promise<{
            category?: string;
        }>;

}



export async function generateMetadata() {

    const t =
        await getTranslations("ProjectsPage");


    return {

        title:
            t("title"),

        description:
            t("subtitle"),

    };

}




export default async function ProjectsPage({
    searchParams,
}: ProjectsPageProps) {



    const locale =
        await getLocale();



    const params =
        await searchParams;



    const allowedCategories:
        ProjectCategory[] = [

            "all",
            "fullstack",
            "frontend",
            "backend",
            "saas",
            "featured",

        ];



    const requestedCategory =
        params.category;



    const category: ProjectCategory =
        allowedCategories.includes(
            requestedCategory as ProjectCategory
        )
            ? requestedCategory as ProjectCategory
            : "all";




    const projects =
        await ProjectsService.getAllProjects(
            locale,
            category
        );




    const categories =
        Array.from(

            new Map(

                projects
                    .flatMap(
                        (project) =>
                            project.categories
                    )
                    .map((category) => [
                        category.id,
                        category,
                    ])

            ).values()

        );




    const t =
        await getTranslations(
            "ProjectsPage"
        );




    return (

        <main
            className="
                min-h-screen
                bg-background
                pb-20
            "
        >


            <ProjectsHero />



            <ProjectFilters

                allLabel={
                    t("filters.all")
                }

                categories={
                    categories
                }

            />



            <ProjectsGrid

                projects={
                    projects
                }

            />


        </main>

    );

}