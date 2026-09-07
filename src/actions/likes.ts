"use server";

import { LikesService } from "@/services/likes";

export async function toggleLikeAction(projectId: string) {
    return LikesService.toggleLike(projectId);
}