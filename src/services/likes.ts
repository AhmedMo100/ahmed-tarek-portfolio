/**
 * @file likes.ts
 * @package src/services
 * @description Project likes service.
 */

import prisma from "@/lib/prisma";
import { getVisitorId } from "@/lib/visitor";
import { revalidatePath } from "next/cache";

export interface ToggleLikeResult {
    liked: boolean;
    likesCount: number;
}

export class LikesService {
    /**
     * Get current like state for a project.
     */
    static async getLikeState(
        projectId: string,
    ): Promise<boolean> {
        const visitorId =
            await getVisitorId();

        /**
         * A visitor without an identifier
         * cannot have an existing like.
         */
        if (!visitorId) {
            return false;
        }

        const like =
            await prisma.projectLike.findUnique({
                where: {
                    projectId_visitorId: {
                        projectId,
                        visitorId,
                    },
                },

                select: {
                    id: true,
                },
            });

        return Boolean(like);
    }

    /**
     * Toggle project like.
     *
     * The visitor identifier can be provided by a
     * Server Action. If it is not provided, the
     * existing visitor cookie is read.
     */
    static async toggleLike(
        projectId: string,
        path?: string,
        visitorId?: string,
    ): Promise<ToggleLikeResult> {
        const currentVisitorId =
            visitorId ??
            await getVisitorId();

        /**
         * A visitor identifier is required
         * to create or remove a like.
         */
        if (!currentVisitorId) {
            throw new Error(
                "Visitor identifier is missing.",
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

        const existingLike =
            await prisma.projectLike.findUnique({
                where: {
                    projectId_visitorId: {
                        projectId,
                        visitorId:
                            currentVisitorId,
                    },
                },

                select: {
                    id: true,
                },
            });

        /**
         * Remove the existing like.
         */
        if (existingLike) {
            await prisma.projectLike.delete({
                where: {
                    id: existingLike.id,
                },
            });
        }

        /**
         * Create a new like.
         */
        else {
            await prisma.projectLike.create({
                data: {
                    projectId,
                    visitorId:
                        currentVisitorId,
                },
            });
        }

        /**
         * Retrieve the updated likes count.
         */
        const likesCount =
            await prisma.projectLike.count({
                where: {
                    projectId,
                },
            });

        /**
         * Revalidate the page when a path
         * is explicitly provided.
         */
        if (path) {
            revalidatePath(path);
        }

        return {
            liked: !existingLike,
            likesCount,
        };
    }
}