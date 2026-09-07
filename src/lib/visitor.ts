import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const VISITOR_COOKIE_NAME = "portfolio_visitor_id";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export async function getVisitorId(): Promise<string> {
    const cookieStore = await cookies();

    const existingVisitorId = cookieStore.get(VISITOR_COOKIE_NAME)?.value;

    if (existingVisitorId) {
        return existingVisitorId;
    }

    const visitorId = randomUUID();

    cookieStore.set(VISITOR_COOKIE_NAME, visitorId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
    });

    return visitorId;
}