/**
 * @file comments.ts
 * @package src/services
 * @description Project comments service.
 */

import prisma from "@/lib/prisma";
import { getVisitorId } from "@/lib/visitor";
import { revalidatePath } from "next/cache";

export interface CreateCommentInput {
    authorName: string;
    content: string;
    projectId: string;
}

export class CommentsService {
    /**
     * Get approved comments for a project.
     */
    static async getComments(projectId: string) {
        return prisma.comment.findMany({
            where: {
                projectId,
                status: "APPROVED",
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    /**
     * Create a new project comment.
     *
     * New comments always start as PENDING
     * and require approval before becoming public.
     */
    static async createComment({
        authorName,
        content,
        projectId,
    }: CreateCommentInput) {
        const cleanAuthorName =
            authorName.trim();

        const cleanContent =
            content.trim();

        if (
            cleanAuthorName.length < 2 ||
            cleanContent.length < 3
        ) {
            throw new Error(
                "Invalid comment.",
            );
        }

        const project =
            await prisma.project.findUnique({
                where: {
                    id: projectId,
                },
                select: {
                    id: true,
                },
            });

        if (!project) {
            throw new Error(
                "Project not found.",
            );
        }

        const visitorId =
            await getVisitorId();

        /**
         * A visitor identifier is required
         * before creating a comment.
         *
         * The identifier should be created
         * inside the Server Action before
         * calling this service.
         */
        if (!visitorId) {
            throw new Error(
                "Visitor identifier is missing.",
            );
        }

        const comment =
            await prisma.comment.create({
                data: {
                    authorName:
                        cleanAuthorName,

                    content:
                        cleanContent,

                    projectId,

                    visitorId,

                    status: "PENDING",
                },
            });

        revalidatePath("/");

        return comment;
    }
}