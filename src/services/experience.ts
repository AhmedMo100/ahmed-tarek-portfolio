/**
 * @file experience.ts
 * @package src/services
 * @preview Data access layer for indexing professional tenures and internship timelines.
 */

import prisma from "@/lib/prisma";

export interface ProfessionalExperience {
    id: string;
    companyEn: string;
    companyAr: string;
    roleEn: string;
    roleAr: string;
    durationEn: string;
    durationAr: string;
    descriptionEn: string;
    descriptionAr: string;
    startDate: Date;
    endDate: Date | null;
}

export async function getExperiences(): Promise<ProfessionalExperience[]> {
    try {
        return await prisma.experience.findMany({
            orderBy: { startDate: 'desc' }
        });
    } catch (error) {
        console.error("Error fetching professional experiences:", error);
        return [];
    }
}