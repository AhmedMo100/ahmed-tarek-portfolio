/**
 * @file quality.ts
 * @package src/services
 * @preview Data access layer for retrieving engineering principles and quality standards.
 */

import prisma from "@/lib/prisma";

export interface QualityStandard {
    id: string;
    titleEn: string;
    titleAr: string;
    descriptionEn: string;
    descriptionAr: string;
    icon: string;
}

export async function getQualityStandards(): Promise<QualityStandard[]> {
    try {
        return await prisma.qualityStandard.findMany();
    } catch (error) {
        console.error("Error fetching quality standards registry:", error);
        return [];
    }
}