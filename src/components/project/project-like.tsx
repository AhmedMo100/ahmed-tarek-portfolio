/**
 * @file project-like.tsx
 * @package src/components/project
 * @description
 * Interactive project like button with optimistic UI updates.
 */

"use client";

import {
    useState,
    useTransition,
} from "react";

import {
    Heart,
} from "lucide-react";

import { useTranslations } from "next-intl";

import { toggleLikeAction } from "@/actions/likes";



interface ProjectLikeProps {

    projectId: string;

    initialLikes: number;

    initialLiked: boolean;

}



export function ProjectLike({
    projectId,
    initialLikes,
    initialLiked,
}: ProjectLikeProps) {

    const t = useTranslations(
        "projects.details.feedback.like"
    );


    const [
        liked,
        setLiked,
    ] = useState(
        initialLiked
    );


    const [
        likesCount,
        setLikesCount,
    ] = useState(
        initialLikes
    );


    const [
        isPending,
        startTransition,
    ] = useTransition();



    /**
     * Toggle project like with an optimistic UI update.
     */
    const handleToggleLike = () => {

        if (isPending) {
            return;
        }


        /**
         * Preserve the current state
         * in case the request fails.
         */
        const previousLiked =
            liked;


        const previousLikesCount =
            likesCount;



        /**
         * Calculate the next optimistic state.
         */
        const nextLiked =
            !liked;



        /**
         * Apply optimistic state immediately.
         */
        setLiked(
            nextLiked
        );


        setLikesCount(
            (current) =>
                nextLiked
                    ? current + 1
                    : Math.max(
                        0,
                        current - 1
                    )
        );



        startTransition(
            async () => {

                try {

                    const result =
                        await toggleLikeAction(
                            projectId
                        );


                    /**
                     * Synchronize the optimistic UI
                     * with the actual database result.
                     */
                    setLiked(
                        result.liked
                    );


                    setLikesCount(
                        result.likesCount
                    );

                } catch (error) {

                    /**
                     * Roll back optimistic state
                     * when the request fails.
                     */
                    setLiked(
                        previousLiked
                    );


                    setLikesCount(
                        previousLikesCount
                    );


                    console.error(
                        "Failed to toggle project like:",
                        error
                    );

                }

            }
        );

    };



    return (
        <button
            type="button"
            onClick={
                handleToggleLike
            }
            disabled={
                isPending
            }
            aria-pressed={
                liked
            }
            aria-label={
                liked
                    ? t("unlikeAria")
                    : t("likeAria")
            }
            className="
                group
                relative
                flex
                w-full
                items-center
                justify-between
                gap-4
                rounded-2xl
                border
                border-border/70
                bg-background/60
                px-4
                py-3.5
                text-left
                outline-none
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-primary/30
                hover:bg-primary/[0.04]
                hover:shadow-sm
                focus-visible:border-primary/50
                focus-visible:ring-4
                focus-visible:ring-primary/10
                active:translate-y-0
                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:translate-y-0
            "
        >

            {/* ==================================================
                Left Content
                ================================================== */}

            <div
                className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                "
            >

                {/* Heart */}

                <div
                    className={`
                        relative
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        transition-all
                        duration-300

                        ${liked
                            ? `
                                bg-primary
                                text-primary-foreground
                                shadow-md
                                shadow-primary/20
                            `
                            : `
                                bg-muted/80
                                text-muted-foreground
                                group-hover:bg-primary/10
                                group-hover:text-primary
                            `
                        }
                    `}
                >

                    {/* Subtle active glow */}

                    {liked && (
                        <span
                            aria-hidden="true"
                            className="
                                absolute
                                inset-0
                                rounded-xl
                                bg-primary
                                opacity-20
                                blur-md
                            "
                        />
                    )}


                    <Heart
                        aria-hidden="true"
                        className={`
                            relative
                            h-[18px]
                            w-[18px]
                            transition-transform
                            duration-300

                            ${liked
                                ? "scale-110 fill-current"
                                : "group-hover:scale-110"
                            }
                        `}
                    />

                </div>



                {/* Text */}

                <div
                    className="
                        min-w-0
                    "
                >

                    <p
                        className="
                            truncate
                            text-sm
                            font-semibold
                            text-foreground
                        "
                    >
                        {liked
                            ? t("likedText")
                            : t("likeText")
                        }
                    </p>


                    <p
                        className="
                            mt-0.5
                            text-xs
                            text-muted-foreground
                        "
                    >

                        {likesCount}{" "}

                        {likesCount === 1
                            ? t("oneLike")
                            : t("likes")
                        }

                    </p>

                </div>

            </div>



            {/* ==================================================
                Status
                ================================================== */}

            <span
                className={`
                    shrink-0
                    rounded-full
                    px-2.5
                    py-1
                    text-[11px]
                    font-bold
                    transition-all
                    duration-300

                    ${liked
                        ? `
                            bg-primary/10
                            text-primary
                        `
                        : `
                            bg-muted
                            text-muted-foreground
                            group-hover:bg-primary/10
                            group-hover:text-primary
                        `
                    }
                `}
            >

                {isPending
                    ? "..."
                    : liked
                        ? t("likedStatus")
                        : t("likeStatus")
                }

            </span>

        </button>
    );

}