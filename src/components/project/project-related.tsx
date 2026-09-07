/**
 * @file project-related.tsx
 * @package src/components/project
 * @description
 * Displays intelligently matched related projects and
 * the final contact call-to-action.
 */

import Image from "next/image";
import {
    ArrowRight,
    FolderKanban,
    MessageCircle,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/routing";

import {
    LocalizedProject,
    ProjectsService,
} from "@/services/projects";



interface ProjectRelatedProps {

    project: LocalizedProject;

    locale: string;

}



export async function ProjectRelated({
    project,
    locale,
}: ProjectRelatedProps) {

    const t =
        await getTranslations({
            locale,
            namespace:
                "projects.details.related",
        });



    /**
     * Extract current project categories.
     */
    const categoryIds =
        project.categories.map(
            (category) =>
                category.id,
        );



    /**
     * Retrieve intelligently matched projects.
     */
    const relatedProjects =
        await ProjectsService.getRelatedProjects(
            project.id,
            categoryIds,
            project.technologies,
            locale,
            3,
        );



    if (
        relatedProjects.length === 0
    ) {
        return null;
    }



    return (
        <section
            className="
                relative
                px-4
                py-14
                sm:py-16
                lg:py-20
            "
        >

            <div
                className="
                    mx-auto
                    max-w-6xl
                "
            >

                {/* ==================================================
                    RELATED PROJECTS
                ================================================== */}

                <div>

                    {/* Header */}

                    <div
                        className="
                            mb-7
                            flex
                            flex-col
                            gap-4
                            sm:mb-8
                            sm:flex-row
                            sm:items-end
                            sm:justify-between
                        "
                    >

                        <div
                            className="
                                min-w-0
                            "
                        >

                            {/* Eyebrow */}

                            <div
                                className="
                                    mb-3
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-primary/15
                                    bg-primary/5
                                    px-3
                                    py-1.5
                                    text-[11px]
                                    font-bold
                                    text-primary
                                "
                            >

                                <FolderKanban
                                    aria-hidden="true"
                                    className="
                                        h-3.5
                                        w-3.5
                                    "
                                />

                                <span>
                                    {t("eyebrow")}
                                </span>

                            </div>



                            {/* Title */}

                            <h2
                                className="
                                    text-2xl
                                    font-black
                                    tracking-tight
                                    text-foreground
                                    sm:text-3xl
                                "
                            >
                                {t("title")}
                            </h2>



                            {/* Accent */}

                            <div
                                className="
                                    mt-3
                                    h-0.5
                                    w-10
                                    rounded-full
                                    bg-primary
                                "
                            />

                        </div>



                        {/* View All */}

                        <Link
                            href="/projects"
                            className="
                                group
                                inline-flex
                                w-fit
                                shrink-0
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-border
                                bg-background
                                px-5
                                py-3
                                text-sm
                                font-bold
                                text-foreground
                                transition-all
                                duration-300
                                hover:border-primary/30
                                hover:bg-primary/5
                                hover:text-primary
                            "
                        >

                            <span>
                                {t("viewAll")}
                            </span>


                            <ArrowRight
                                aria-hidden="true"
                                className="
                                    h-4
                                    w-4
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                    rtl:rotate-180
                                    rtl:group-hover:-translate-x-1
                                "
                            />

                        </Link>

                    </div>



                    {/* ==================================================
                        Related Projects
                    ================================================== */}

                    <div
                        className="
                            grid
                            gap-4
                            sm:grid-cols-2
                            lg:grid-cols-3
                        "
                    >

                        {relatedProjects.map(
                            (
                                relatedProject,
                            ) => (

                                <Link
                                    key={
                                        relatedProject.slug
                                    }
                                    href={`/projects/${relatedProject.slug}`}
                                    className="
                                        group
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-border/70
                                        bg-card
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-primary/25
                                        hover:shadow-lg
                                    "
                                >

                                    {/* Image */}

                                    <div
                                        className="
                                            relative
                                            aspect-[16/9]
                                            overflow-hidden
                                            bg-muted
                                        "
                                    >

                                        <Image
                                            src={
                                                relatedProject.coverImage
                                            }
                                            alt={
                                                relatedProject.title
                                            }
                                            fill
                                            sizes="
                                                (max-width: 640px) 100vw,
                                                (max-width: 1024px) 50vw,
                                                33vw
                                            "
                                            className="
                                                object-cover
                                                transition-transform
                                                duration-500
                                                group-hover:scale-105
                                            "
                                        />


                                        <div
                                            className="
                                                absolute
                                                inset-0
                                                bg-gradient-to-t
                                                from-background/60
                                                via-transparent
                                                to-transparent
                                                opacity-0
                                                transition-opacity
                                                duration-300
                                                group-hover:opacity-100
                                            "
                                        />

                                    </div>



                                    {/* Content */}

                                    <div
                                        className="
                                            p-4
                                        "
                                    >

                                        {/* Category */}

                                        {relatedProject.categories
                                            .slice(0, 1)
                                            .map(
                                                (
                                                    category,
                                                ) => (

                                                    <span
                                                        key={
                                                            category.id
                                                        }
                                                        className="
                                                            text-[10px]
                                                            font-bold
                                                            uppercase
                                                            tracking-wider
                                                            text-primary
                                                        "
                                                    >
                                                        {
                                                            category.name
                                                        }
                                                    </span>

                                                ),
                                            )}



                                        {/* Title */}

                                        <h3
                                            className="
                                                mt-1.5
                                                line-clamp-1
                                                text-base
                                                font-bold
                                                text-foreground
                                                transition-colors
                                                duration-200
                                                group-hover:text-primary
                                            "
                                        >
                                            {
                                                relatedProject.title
                                            }
                                        </h3>



                                        {/* Description */}

                                        <p
                                            className="
                                                mt-1.5
                                                line-clamp-2
                                                text-xs
                                                leading-5
                                                text-muted-foreground
                                            "
                                        >
                                            {
                                                relatedProject.description
                                            }
                                        </p>



                                        {/* Explore */}

                                        <div
                                            className="
                                                mt-4
                                                flex
                                                items-center
                                                gap-1.5
                                                text-[11px]
                                                font-bold
                                                text-primary
                                            "
                                        >

                                            <span>
                                                {
                                                    t(
                                                        "exploreProject",
                                                    )
                                                }
                                            </span>


                                            <ArrowRight
                                                aria-hidden="true"
                                                className="
                                                    h-3
                                                    w-3
                                                    transition-transform
                                                    duration-300
                                                    group-hover:translate-x-1
                                                    rtl:rotate-180
                                                    rtl:group-hover:-translate-x-1
                                                "
                                            />

                                        </div>

                                    </div>

                                </Link>

                            ),
                        )}

                    </div>

                </div>



                {/* ==================================================
                    FINAL CONTACT CTA
                ================================================== */}

                <div
                    className="
                        relative
                        mt-16
                        overflow-hidden
                        rounded-[2rem]
                        border
                        border-primary/15
                        bg-primary/[0.04]
                        px-6
                        py-12
                        text-center
                        sm:mt-20
                        sm:px-10
                        sm:py-14
                        lg:px-16
                    "
                >

                    {/* Decorative Background */}

                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            left-1/2
                            top-0
                            h-64
                            w-64
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            bg-primary/10
                            blur-3xl
                        "
                    />


                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            -bottom-24
                            -right-24
                            h-56
                            w-56
                            rounded-full
                            bg-primary/5
                            blur-3xl
                        "
                    />



                    <div
                        className="
                            relative
                            mx-auto
                            max-w-2xl
                        "
                    >

                        {/* Icon */}

                        <div
                            className="
                                mx-auto
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-primary/15
                                bg-background
                                shadow-sm
                            "
                        >

                            <MessageCircle
                                aria-hidden="true"
                                className="
                                    h-5
                                    w-5
                                    text-primary
                                "
                            />

                        </div>



                        {/* Title */}

                        <h2
                            className="
                                mt-5
                                text-2xl
                                font-black
                                tracking-tight
                                text-foreground
                                sm:text-3xl
                                lg:text-4xl
                            "
                        >
                            {t("cta.title")}
                        </h2>



                        {/* Description */}

                        <p
                            className="
                                mx-auto
                                mt-3
                                max-w-lg
                                text-sm
                                leading-7
                                text-muted-foreground
                                sm:text-base
                            "
                        >
                            {t("cta.description")}
                        </p>



                        {/* CTA */}

                        <Link
                            href="/contact"
                            className="
                                group
                                mt-7
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-primary
                                px-6
                                py-3
                                text-sm
                                font-bold
                                text-primary-foreground
                                shadow-lg
                                shadow-primary/10
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:shadow-xl
                                hover:shadow-primary/20
                                active:scale-95
                            "
                        >

                            <span>
                                {t("cta.button")}
                            </span>


                            <ArrowRight
                                aria-hidden="true"
                                className="
                                    h-4
                                    w-4
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                    rtl:rotate-180
                                    rtl:group-hover:-translate-x-1
                                "
                            />

                        </Link>

                    </div>

                </div>

            </div>

        </section>
    );
}