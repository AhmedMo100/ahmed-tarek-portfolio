/**
 * @file project-feedback.tsx
 * @package src/components/project
 * @description
 * Project interaction section combining project likes,
 * comment submission, and the project comments list.
 */

import {
    Heart,
    MessageCircle,
    Sparkles,
} from "lucide-react";

import { getTranslations } from "next-intl/server";

import { LocalizedProject } from "@/services/projects";
import { LikesService } from "@/services/likes";

import { ProjectLike } from "./project-like";
import { ProjectComments } from "./project-comments";



interface ProjectFeedbackProps {

    project: LocalizedProject;

}



export async function ProjectFeedback({
    project,
}: ProjectFeedbackProps) {

    /**
     * Retrieve the current visitor's like state.
     */
    const initialLiked =
        await LikesService.getLikeState(
            project.id,
        );


    const t = await getTranslations(
        "projects.details.feedback"
    );



    return (
        <section
            id="feedback"
            className="
                relative
                overflow-hidden
                px-4
                py-16
                sm:py-20
                lg:py-24
            "
        >

            {/* ==================================================
                Decorative Background
            ================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    -z-10
                    h-72
                    bg-gradient-to-b
                    from-primary/[0.04]
                    via-primary/[0.015]
                    to-transparent
                "
            />


            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    -z-10
                    h-64
                    w-64
                    -translate-x-1/2
                    rounded-full
                    bg-primary/[0.06]
                    blur-3xl
                "
            />



            <div
                className="
                    mx-auto
                    max-w-6xl
                "
            >

                {/* ==================================================
                    Section Header
                ================================================== */}

                <div
                    className="
                        mx-auto
                        mb-10
                        max-w-2xl
                        text-center
                        sm:mb-14
                    "
                >

                    <div
                        className="
                            mb-4
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-border/70
                            bg-background/70
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            text-muted-foreground
                            shadow-sm
                            backdrop-blur
                        "
                    >

                        <MessageCircle
                            className="
                                h-3.5
                                w-3.5
                                text-primary
                            "
                        />

                        <span>
                            {t("eyebrow")}
                        </span>

                    </div>



                    <div
                        className="
                            mb-3
                            flex
                            items-center
                            justify-center
                            gap-2
                        "
                    >

                        <Sparkles
                            aria-hidden="true"
                            className="
                                hidden
                                h-5
                                w-5
                                text-primary/70
                                sm:block
                            "
                        />


                        <h2
                            className="
                                text-3xl
                                font-black
                                tracking-tight
                                text-foreground
                                sm:text-4xl
                                lg:text-5xl
                            "
                        >
                            {t("title")}
                        </h2>

                    </div>



                    <p
                        className="
                            mx-auto
                            max-w-xl
                            text-sm
                            leading-7
                            text-muted-foreground
                            sm:text-base
                        "
                    >
                        {t("description")}
                    </p>

                </div>



                {/* ==================================================
                    Top Interaction Row
                    Like + Comment Form
                ================================================== */}

                <div
                    className="
                        grid
                        gap-5
                        lg:grid-cols-[280px_minmax(0,1fr)]
                        lg:items-start
                    "
                >

                    {/* ==================================================
                        Like Card
                    ================================================== */}

                    <div
                        className="
                            group
                            relative
                            self-start
                            overflow-hidden
                            rounded-3xl
                            border
                            border-border/70
                            bg-card/80
                            p-6
                            shadow-sm
                            backdrop-blur
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:border-primary/20
                            hover:shadow-md
                            sm:p-7
                        "
                    >

                        {/* Card Glow */}

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
                                blur-2xl
                                opacity-70
                                transition-opacity
                                duration-300
                                group-hover:opacity-100
                            "
                        />



                        <div
                            className="
                                relative
                            "
                        >

                            {/* Like Header */}

                            <div
                                className="
                                    flex
                                    items-start
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-primary/10
                                        ring-1
                                        ring-primary/10
                                    "
                                >

                                    <Heart
                                        aria-hidden="true"
                                        className="
                                            h-5
                                            w-5
                                            text-primary
                                        "
                                    />

                                </div>



                                <div
                                    className="
                                        min-w-0
                                    "
                                >

                                    <p
                                        className="
                                            text-sm
                                            font-bold
                                            text-foreground
                                        "
                                    >
                                        {t("like.title")}
                                    </p>



                                    <p
                                        className="
                                            mt-1
                                            text-xs
                                            leading-5
                                            text-muted-foreground
                                        "
                                    >
                                        {t("like.description")}
                                    </p>

                                </div>

                            </div>



                            {/* Like Action */}

                            <div
                                className="
                                    mt-6
                                    rounded-2xl
                                    border
                                    border-border/60
                                    bg-muted/20
                                    p-3
                                "
                            >

                                <ProjectLike
                                    projectId={
                                        project.id
                                    }
                                    initialLikes={
                                        project.likes
                                    }
                                    initialLiked={
                                        initialLiked
                                    }
                                />

                            </div>

                        </div>

                    </div>



                    {/* ==================================================
                        Comment Form
                    ================================================== */}

                    <div
                        className="
                            min-w-0
                        "
                    >

                        <ProjectComments
                            projectId={
                                project.id
                            }
                            comments={
                                project.comments
                            }
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}