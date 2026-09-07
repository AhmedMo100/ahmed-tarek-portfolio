/**
 * @file likes.ts
 * @package src/services
 * @description Project likes service.
 */

import prisma from "@/lib/prisma";
import {
    getVisitorId,
    getOrCreateVisitorId,
} from "@/lib/visitor";
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
     */
    static async toggleLike(
        projectId: string,
        path?: string,
    ): Promise<ToggleLikeResult> {
        const visitorId =
            await getOrCreateVisitorId();

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
                        visitorId,
                    },
                },
                select: {
                    id: true,
                },
            });

        if (existingLike) {
            await prisma.projectLike.delete({
                where: {
                    id: existingLike.id,
                },
            });
        } else {
            await prisma.projectLike.create({
                data: {
                    projectId,
                    visitorId,
                },
            });
        }

        const likesCount =
            await prisma.projectLike.count({
                where: {
                    projectId,
                },
            });

        if (path) {
            revalidatePath(path);
        }

        return {
            liked: !existingLike,
            likesCount,
        };
    }
}