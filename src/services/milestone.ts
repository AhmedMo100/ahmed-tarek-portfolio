/**
 * @file milestone.ts
 * @package src/services
 * @preview Data access layer for fetching professional journey milestones.
 */

import prisma from "@/lib/prisma";

export interface JourneyMilestone {
    id: string;
    titleEn: string;
    titleAr: string;
    descriptionEn: string;
    descriptionAr: string;
    year: string | null;
    order: number;
}

export async function getMilestones(): Promise<JourneyMilestone[]> {
    try {
        return await prisma.milestone.findMany({
            orderBy: { order: 'asc' }
        });
    } catch (error) {
        console.error("Error fetching journey milestones:", error);
        return [];
    }
}