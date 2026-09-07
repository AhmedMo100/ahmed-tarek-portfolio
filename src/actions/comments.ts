"use server";

import { CommentsService } from "@/services/comments";

interface CreateCommentInput {
    authorName: string;
    content: string;
    projectId: string;
}

export async function createCommentAction(
    data: CreateCommentInput,
) {
    return CommentsService.createComment(data);
}