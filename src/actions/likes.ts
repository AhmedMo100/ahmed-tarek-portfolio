"use server";

import { cookies } from "next/headers";
import { randomUUID } from "crypto";

import { LikesService } from "@/services/likes";

const VISITOR_COOKIE_NAME =
    "portfolio_visitor_id";

const COOKIE_MAX_AGE =
    60 * 60 * 24 * 365; // 1 year

export async function toggleLikeAction(
    projectId: string,
) {
    const cookieStore = await cookies();

    let visitorId =
        cookieStore
            .get(VISITOR_COOKIE_NAME)
            ?.value;

    /**
     * Create a persistent visitor identifier
     * for first-time visitors.
     */
    if (!visitorId) {
        visitorId = randomUUID();

        cookieStore.set(
            VISITOR_COOKIE_NAME,
            visitorId,
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV ===
                    "production",
                sameSite: "lax",
                maxAge: COOKIE_MAX_AGE,
                path: "/",
            },
        );
    }

    return LikesService.toggleLike(
        projectId,

        visitorId,
    );
}