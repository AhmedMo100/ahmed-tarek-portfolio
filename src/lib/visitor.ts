import { cookies } from "next/headers";

const VISITOR_COOKIE_NAME = "portfolio_visitor_id";

export async function getVisitorId(): Promise<string | null> {
    const cookieStore = await cookies();

    return (
        cookieStore
            .get(VISITOR_COOKIE_NAME)
            ?.value ?? null
    );
}