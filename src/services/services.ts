/**
 * @file services.ts
 * @package src/services
 * @preview Data access layer for fetching architectural or freelance solutions.
 */

import prisma from "@/lib/prisma";

export interface ServiceItem {
    id: string;
    titleEn: string;
    titleAr: string;
    descriptionEn: string;
    descriptionAr: string;
    icon: string;
}

export async function getServices(): Promise<ServiceItem[]> {
    try {
        return await prisma.service.findMany();
    } catch (error) {
        console.error("Error fetching professional services:", error);
        return [];
    }
}