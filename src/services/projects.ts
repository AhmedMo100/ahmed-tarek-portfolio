/**
 * @file projects.ts
 * @package src/services
 * @description Centralized project service responsible for
 * retrieving, localizing, filtering, and transforming project data.
 */

import prisma from "@/lib/prisma";
import { getVisitorId } from "@/lib/visitor";
import { Project } from "@/generated/prisma/client";
import { cache } from "react";

/**
 * Localized project model consumed by UI components.
 */
export interface LocalizedProject {
    id: string;

    title: string;
    slug: string;

    /**
     * Both localized slugs are kept on the model for reference,
     * but routing always resolves via slugEn — see mapProject.
     */
    slugEn: string;
    slugAr: string;

    description: string;
    content: string;

    workspacePath: string;
    coverImage: string;

    liveUrl: string | null;
    githubFront: string | null;
    githubBack: string | null;

    technologies: string[];
    sharedPackages: string[];

    likes: number;
    isLiked: boolean;

    createdAt: Date;

    categories: {
        id: string;
        name: string;
        slug: string;
    }[];

    images: {
        id: string;
        url: string;
        altText: string | null;
    }[];

    comments: {
        id: string;
        authorName: string;
        content: string;
        createdAt: Date;
    }[];
}

/**
 * Lightweight project model used only inside navbar dropdown.
 */
export interface NavbarProject {
    id: string;
    title: string;
    slug: string;
    coverImage: string;
}

/**
 * Supported project filtering categories.
 */
export type ProjectCategory =
    | "all"
    | "frontend"
    | "backend"
    | "fullstack"
    | "saas"
    | "featured";

export class ProjectsService {
    /**
     * Converts Prisma project into localized UI model.
     */
    private static mapProject(
        project: Project & {
            categories: {
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
            }[];

            images: {
                id: string;
                url: string;
                altText: string | null;
            }[];

            comments: {
                id: string;
                authorName: string;
                content: string;
                createdAt: Date;
            }[];
        },
        likes: number,
        isLiked: boolean,
        isArabic: boolean,
    ): LocalizedProject {
        return {
            id: project.id,

            title: isArabic
                ? project.titleAr
                : project.titleEn,

            // Project routes always resolve via the English slug regardless
            // of the active locale, so switching language never changes
            // the URL — only the localized content it renders.
            slug: project.slugEn,

            slugEn: project.slugEn,
            slugAr: project.slugAr,

            description: isArabic
                ? project.descriptionAr
                : project.descriptionEn,

            content: isArabic
                ? project.contentAr
                : project.contentEn,

            workspacePath: project.workspacePath,
            coverImage: project.coverImage,

            liveUrl: project.liveUrl,
            githubFront: project.githubFront,
            githubBack: project.githubBack,

            technologies: project.technologies,
            sharedPackages: project.sharedPackages,

            likes,
            isLiked,

            createdAt: project.createdAt,

            categories: project.categories.map((category) => ({
                id: category.id,

                name: isArabic
                    ? category.nameAr
                    : category.nameEn,

                slug: category.slug,
            })),

            images: project.images,

            comments: project.comments.map((comment) => ({
                id: comment.id,
                authorName: comment.authorName,
                content: comment.content,
                createdAt: comment.createdAt,
            })),
        };
    }

    /**
     * Retrieves projects with category filtering support.
     * Used by the main projects listing page.
     */
    static getAllProjects = cache(
        async (
            locale: string,
            category: ProjectCategory = "all",
        ): Promise<LocalizedProject[]> => {
            const isArabic = locale.startsWith("ar");

            const where =
                category === "all"
                    ? {}
                    : {
                        categories: {
                            some: {
                                slug: category,
                            },
                        },
                    };

            const projects = await prisma.project.findMany({
                where,

                include: {
                    categories: true,
                    images: true,

                    comments: {
                        where: {
                            status: "APPROVED",
                        },

                        orderBy: {
                            createdAt: "desc",
                        },

                        take: 3,
                    },
                },

                orderBy: {
                    createdAt: "desc",
                },
            });

            return Promise.all(
                projects.map(async (project) => {
                    const likes =
                        await prisma.projectLike.count({
                            where: {
                                projectId: project.id,
                            },
                        });

                    return this.mapProject(
                        project,
                        likes,
                        false,
                        isArabic,
                    );
                }),
            );
        },
    );

    /**
     * Retrieves lightweight projects for navbar dropdown.
     */
    static getNavbarProjects = cache(
        async (
            locale: string,
        ): Promise<NavbarProject[]> => {
            const isArabic = locale.startsWith("ar");

            const projects =
                await prisma.project.findMany({
                    select: {
                        id: true,
                        titleAr: true,
                        titleEn: true,
                        slugEn: true,
                        coverImage: true,
                    },

                    orderBy: {
                        createdAt: "desc",
                    },

                    take: 6,
                });

            return projects.map((project) => ({
                id: project.id,

                title: isArabic
                    ? project.titleAr
                    : project.titleEn,

                // Single canonical slug across locales.
                slug: project.slugEn,

                coverImage: project.coverImage,
            }));
        },
    );

    /**
     * Retrieves a single project using its canonical (English) slug.
     * Used by the project details page.
     */
    static getProjectBySlug = cache(
        async (
            slug: string,
            locale: string,
        ): Promise<LocalizedProject | null> => {
            const isArabic = locale.startsWith("ar");

            // The route slug is always the English one, independent of
            // locale — the locale only controls which localized fields
            // are surfaced by mapProject below.
            const project =
                await prisma.project.findFirst({
                    where: {
                        slugEn: slug,
                    },

                    include: {
                        categories: true,
                        images: true,

                        comments: {
                            where: {
                                status: "APPROVED",
                            },

                            orderBy: {
                                createdAt: "desc",
                            },
                        },
                    },
                });

            if (!project) {
                return null;
            }

            const visitorId = await getVisitorId();

            const [likes, existingLike] =
                await Promise.all([
                    prisma.projectLike.count({
                        where: {
                            projectId: project.id,
                        },
                    }),

                    prisma.projectLike.findUnique({
                        where: {
                            projectId_visitorId: {
                                projectId: project.id,
                                visitorId,
                            },
                        },

                        select: {
                            id: true,
                        },
                    }),
                ]);

            return this.mapProject(
                project,
                likes,
                Boolean(existingLike),
                isArabic,
            );
        },
    );

    /**
     * Retrieves featured projects.
     */
    static async getFeaturedProjects(
        locale: string,
    ): Promise<LocalizedProject[]> {
        return this.getAllProjects(
            locale,
            "featured",
        );
    }

    /**
     * Retrieves projects related to the current project.
     *
     * Matching priority:
     * 1. Shared categories.
     * 2. Shared technologies.
     * 3. Recent projects as a fallback.
     */
    static async getRelatedProjects(
        projectId: string,
        categoryIds: string[],
        technologies: string[],
        locale: string,
        limit: number = 3,
    ): Promise<LocalizedProject[]> {
        const isArabic =
            locale.startsWith("ar");

        /**
         * Retrieve all candidate projects except
         * the currently viewed project.
         */
        const projects =
            await prisma.project.findMany({
                where: {
                    id: {
                        not: projectId,
                    },
                },

                include: {
                    categories: true,
                    images: true,

                    comments: {
                        where: {
                            status: "APPROVED",
                        },

                        orderBy: {
                            createdAt: "desc",
                        },

                        take: 3,
                    },
                },

                orderBy: {
                    createdAt: "desc",
                },
            });

        /**
         * Rank projects based on their similarity
         * to the current project.
         */
        const rankedProjects =
            projects
                .map((project) => {
                    const sharedCategories =
                        project.categories.filter(
                            (category) =>
                                categoryIds.includes(
                                    category.id,
                                ),
                        ).length;

                    const sharedTechnologies =
                        project.technologies.filter(
                            (technology) =>
                                technologies.includes(
                                    technology,
                                ),
                        ).length;

                    return {
                        project,
                        sharedCategories,
                        sharedTechnologies,
                    };
                })
                .sort(
                    (a, b) => {
                        /**
                         * Categories have the highest priority.
                         */
                        if (
                            b.sharedCategories !==
                            a.sharedCategories
                        ) {
                            return (
                                b.sharedCategories -
                                a.sharedCategories
                            );
                        }

                        /**
                         * Technologies are the second priority.
                         */
                        if (
                            b.sharedTechnologies !==
                            a.sharedTechnologies
                        ) {
                            return (
                                b.sharedTechnologies -
                                a.sharedTechnologies
                            );
                        }

                        /**
                         * Newer projects win when
                         * similarity is equal.
                         */
                        return (
                            b.project.createdAt.getTime() -
                            a.project.createdAt.getTime()
                        );
                    },
                )
                .filter(
                    ({
                        sharedCategories,
                        sharedTechnologies,
                    }) =>
                        sharedCategories > 0 ||
                        sharedTechnologies > 0,
                );

        /**
         * Start with genuinely related projects.
         */
        const relatedProjects =
            rankedProjects
                .slice(0, limit)
                .map(
                    ({ project }) =>
                        project,
                );

        /**
         * If there are not enough related projects,
         * fill the remaining slots with recent projects.
         */
        if (
            relatedProjects.length < limit
        ) {
            const selectedProjectIds =
                new Set(
                    relatedProjects.map(
                        (project) =>
                            project.id,
                    ),
                );

            const fallbackProjects =
                projects.filter(
                    (project) =>
                        !selectedProjectIds.has(
                            project.id,
                        ),
                );

            relatedProjects.push(
                ...fallbackProjects.slice(
                    0,
                    limit -
                    relatedProjects.length,
                ),
            );
        }

        /**
         * Transform projects into the localized
         * UI model.
         */
        return Promise.all(
            relatedProjects.map(
                async (project) => {
                    const likes =
                        await prisma.projectLike.count({
                            where: {
                                projectId:
                                    project.id,
                            },
                        });

                    return this.mapProject(
                        project,
                        likes,
                        false,
                        isArabic,
                    );
                },
            ),
        );
    }

}