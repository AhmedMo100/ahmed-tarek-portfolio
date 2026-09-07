/**
 * @file project-comments.tsx
 * @package src/components/project
 * @description
 * Project comments and feedback interface.
 * Allows visitors to submit comments for approval
 * and displays approved project comments.
 */

"use client";

import {
    FormEvent,
    useState,
    useTransition,
} from "react";

import {
    MessageCircle,
    Send,
    User,
} from "lucide-react";

import { toast } from "sonner";

import { useTranslations } from "next-intl";

import { createCommentAction } from "@/actions/comments";



interface ProjectComment {

    id: string;

    authorName: string;

    content: string;

    createdAt: Date;

}



interface ProjectCommentsProps {

    projectId: string;

    comments: ProjectComment[];

}



export function ProjectComments({
    projectId,
    comments,
}: ProjectCommentsProps) {

    const t = useTranslations(
        "projects.details.feedback.comments"
    );


    const [
        authorName,
        setAuthorName,
    ] = useState("");


    const [
        content,
        setContent,
    ] = useState("");


    const [
        isPending,
        startTransition,
    ] = useTransition();



    /**
     * Handle comment submission.
     */
    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();


        const cleanAuthorName =
            authorName.trim();


        const cleanContent =
            content.trim();



        if (
            cleanAuthorName.length < 2
        ) {

            toast.error(
                t("nameRequired")
            );

            return;

        }



        if (
            cleanContent.length < 3
        ) {

            toast.error(
                t("commentRequired")
            );

            return;

        }



        startTransition(
            async () => {

                try {

                    await createCommentAction({

                        authorName:
                            cleanAuthorName,

                        content:
                            cleanContent,

                        projectId,

                    });


                    /**
                     * Clear form after successful submission.
                     */
                    setAuthorName("");

                    setContent("");


                    toast.success(
                        t("success")
                    );

                } catch (error) {

                    console.error(
                        "Failed to create comment:",
                        error
                    );


                    toast.error(
                        t("error")
                    );

                }

            }
        );

    };



    return (
        <div
            className="
                min-w-0
            "
        >

            {/* ======================================================
                COMMENT FORM
                ====================================================== */}

            <div
                className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-border/70
                    bg-card
                    p-5
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-primary/20
                    hover:shadow-md
                    sm:p-7
                "
            >

                {/* Decorative Glow */}

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        -right-16
                        -top-16
                        h-36
                        w-36
                        rounded-full
                        bg-primary/[0.07]
                        blur-3xl
                    "
                />


                <div
                    className="
                        relative
                    "
                >

                    {/* Form Header */}

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
                                text-primary
                                ring-1
                                ring-primary/10
                            "
                        >

                            <MessageCircle
                                className="
                                    h-5
                                    w-5
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
                                {t("formTitle")}
                            </p>


                            <p
                                className="
                                    mt-1
                                    text-xs
                                    leading-5
                                    text-muted-foreground
                                    sm:text-sm
                                "
                            >
                                {t("formDescription")}
                            </p>

                        </div>

                    </div>



                    {/* Form */}

                    <form
                        onSubmit={
                            handleSubmit
                        }
                        className="
                            mt-6
                            space-y-5
                        "
                    >

                        {/* Name */}

                        <div>

                            <label
                                htmlFor="authorName"
                                className="
                                    mb-2
                                    block
                                    text-xs
                                    font-semibold
                                    text-foreground
                                "
                            >
                                {t("nameLabel")}
                            </label>


                            <div
                                className="
                                    relative
                                "
                            >

                                <User
                                    aria-hidden="true"
                                    className="
                                        pointer-events-none
                                        absolute
                                        left-3.5
                                        top-1/2
                                        h-4
                                        w-4
                                        -translate-y-1/2
                                        text-muted-foreground
                                    "
                                />


                                <input
                                    id="authorName"
                                    name="authorName"
                                    type="text"
                                    autoComplete="name"
                                    value={
                                        authorName
                                    }
                                    onChange={
                                        (event) =>
                                            setAuthorName(
                                                event.target.value
                                            )
                                    }
                                    disabled={
                                        isPending
                                    }
                                    placeholder={
                                        t(
                                            "namePlaceholder"
                                        )
                                    }
                                    className="
                                        h-12
                                        w-full
                                        rounded-xl
                                        border
                                        border-border
                                        bg-background
                                        pl-10
                                        pr-4
                                        text-sm
                                        text-foreground
                                        outline-none
                                        transition-all
                                        duration-200
                                        placeholder:text-muted-foreground
                                        hover:border-border/80
                                        focus:border-primary/50
                                        focus:ring-4
                                        focus:ring-primary/10
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                />

                            </div>

                        </div>



                        {/* Comment */}

                        <div>

                            <div
                                className="
                                    mb-2
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                "
                            >

                                <label
                                    htmlFor="commentContent"
                                    className="
                                        block
                                        text-xs
                                        font-semibold
                                        text-foreground
                                    "
                                >
                                    {t("commentLabel")}
                                </label>


                                <span
                                    className="
                                        text-[11px]
                                        text-muted-foreground
                                    "
                                >
                                    {t("respectful")}
                                </span>

                            </div>


                            <textarea
                                id="commentContent"
                                name="commentContent"
                                value={
                                    content
                                }
                                onChange={
                                    (event) =>
                                        setContent(
                                            event.target.value
                                        )
                                }
                                disabled={
                                    isPending
                                }
                                placeholder={
                                    t(
                                        "commentPlaceholder"
                                    )
                                }
                                rows={6}
                                className="
                                    min-h-32
                                    w-full
                                    resize-none
                                    rounded-xl
                                    border
                                    border-border
                                    bg-background
                                    px-4
                                    py-3
                                    text-sm
                                    leading-6
                                    text-foreground
                                    outline-none
                                    transition-all
                                    duration-200
                                    placeholder:text-muted-foreground
                                    hover:border-border/80
                                    focus:border-primary/50
                                    focus:ring-4
                                    focus:ring-primary/10
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                "
                            />

                        </div>



                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={
                                isPending
                            }
                            className="
                                group
                                inline-flex
                                h-12
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-primary
                                px-5
                                text-sm
                                font-semibold
                                text-primary-foreground
                                shadow-sm
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:shadow-lg
                                hover:shadow-primary/20
                                active:translate-y-0
                                active:scale-[0.99]
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                                disabled:hover:translate-y-0
                            "
                        >

                            <span>
                                {isPending
                                    ? t("submitting")
                                    : t("submit")
                                }
                            </span>


                            <Send
                                aria-hidden="true"
                                className="
                                    h-4
                                    w-4
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-0.5
                                "
                            />

                        </button>

                    </form>

                </div>

            </div>



            {/* ======================================================
                APPROVED COMMENTS
                ====================================================== */}

            <div
                className="
                    mt-8
                    rounded-3xl
                    border
                    border-border/70
                    bg-card
                    p-5
                    shadow-sm
                    sm:mt-10
                    sm:p-7
                "
            >

                {/* Comments Header */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                    "
                >

                    <div
                        className="
                            min-w-0
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <MessageCircle
                                aria-hidden="true"
                                className="
                                    h-4
                                    w-4
                                    text-primary
                                "
                            />


                            <p
                                className="
                                    text-sm
                                    font-bold
                                    text-foreground
                                "
                            >
                                {t("communityTitle")}
                            </p>

                        </div>


                        <p
                            className="
                                mt-1
                                text-xs
                                text-muted-foreground
                            "
                        >

                            {comments.length === 1
                                ? t("oneComment")
                                : t(
                                    "commentCount",
                                    {
                                        count:
                                            comments.length,
                                    }
                                )
                            }

                        </p>

                    </div>


                    <div
                        className="
                            hidden
                            rounded-full
                            border
                            border-border/70
                            bg-muted/40
                            px-3
                            py-1.5
                            text-[11px]
                            font-medium
                            text-muted-foreground
                            sm:block
                        "
                    >
                        {t("approved")}
                    </div>

                </div>



                {/* Divider */}

                <div
                    className="
                        my-6
                        h-px
                        bg-border/70
                    "
                />



                {/* Comments List */}

                <div
                    className="
                        space-y-4
                    "
                >

                    {comments.length > 0
                        ? (

                            comments.map(
                                (comment) => (

                                    <article
                                        key={
                                            comment.id
                                        }
                                        className="
                                            group
                                            relative
                                            overflow-hidden
                                            rounded-2xl
                                            border
                                            border-border/70
                                            bg-background/50
                                            p-5
                                            transition-all
                                            duration-300
                                            hover:-translate-y-0.5
                                            hover:border-primary/20
                                            hover:bg-background
                                            hover:shadow-sm
                                        "
                                    >

                                        {/* Comment Accent */}

                                        <div
                                            aria-hidden="true"
                                            className="
                                                absolute
                                                bottom-0
                                                left-0
                                                top-0
                                                w-0.5
                                                bg-primary/20
                                                transition-colors
                                                duration-300
                                                group-hover:bg-primary
                                            "
                                        />


                                        {/* Comment Header */}

                                        <div
                                            className="
                                                flex
                                                items-start
                                                justify-between
                                                gap-4
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    min-w-0
                                                    items-center
                                                    gap-3
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        h-10
                                                        w-10
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        bg-primary/10
                                                        text-xs
                                                        font-bold
                                                        text-primary
                                                        ring-1
                                                        ring-primary/10
                                                    "
                                                >

                                                    {
                                                        comment.authorName
                                                            .charAt(0)
                                                            .toUpperCase()
                                                    }

                                                </div>


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
                                                        {
                                                            comment.authorName
                                                        }
                                                    </p>


                                                    <p
                                                        className="
                                                            mt-0.5
                                                            text-[11px]
                                                            text-muted-foreground
                                                        "
                                                    >
                                                        {t(
                                                            "projectVisitor"
                                                        )}
                                                    </p>

                                                </div>

                                            </div>


                                            <time
                                                dateTime={
                                                    new Date(
                                                        comment.createdAt
                                                    ).toISOString()
                                                }
                                                className="
                                                    shrink-0
                                                    text-[11px]
                                                    text-muted-foreground
                                                "
                                            >

                                                {
                                                    new Intl.DateTimeFormat(
                                                        "en",
                                                        {
                                                            day:
                                                                "numeric",

                                                            month:
                                                                "short",

                                                            year:
                                                                "numeric",
                                                        }
                                                    ).format(
                                                        new Date(
                                                            comment.createdAt
                                                        )
                                                    )
                                                }

                                            </time>

                                        </div>



                                        {/* Comment Content */}

                                        <p
                                            className="
                                                mt-4
                                                whitespace-pre-line
                                                text-sm
                                                leading-7
                                                text-muted-foreground
                                            "
                                        >
                                            {
                                                comment.content
                                            }
                                        </p>

                                    </article>

                                )
                            )

                        ) : (

                            <div
                                className="
                                    flex
                                    min-h-48
                                    flex-col
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-dashed
                                    border-border
                                    bg-background/30
                                    px-6
                                    py-10
                                    text-center
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-primary/10
                                        text-primary
                                    "
                                >

                                    <MessageCircle
                                        className="
                                            h-6
                                            w-6
                                        "
                                    />

                                </div>


                                <p
                                    className="
                                        mt-4
                                        text-sm
                                        font-semibold
                                        text-foreground
                                    "
                                >
                                    {t("noComments")}
                                </p>


                                <p
                                    className="
                                        mt-2
                                        max-w-sm
                                        text-xs
                                        leading-6
                                        text-muted-foreground
                                    "
                                >
                                    {t("beFirst")}
                                </p>

                            </div>

                        )}

                </div>

            </div>

        </div>
    );

}