/**
 * @file skills.ts
 * @package src/services
 * @preview Server-side data access layer fetching bilingual categorized tech-stack competencies.
 */

import prisma from "@/lib/prisma";
import { SkillCategory } from "@/generated/prisma/client";

export interface TechSkill {
    id: string;
    nameEn: string;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;
    category: SkillCategory;
    icon: string;
}

/**
 * Fetches all categorized skills directly from the database registry with full language mappings.
 * @function getTechStack
 * @returns {Promise<TechSkill[]>} Formatted array of bilingual technical skill entities.
 */
export async function getTechStack(): Promise<TechSkill[]> {
    try {
        return await prisma.skill.findMany({
            select: {
                id: true,
                nameEn: true,
                nameAr: true,
                descriptionEn: true,
                descriptionAr: true,
                category: true,
                icon: true,
            }
        });
    } catch (error) {
        console.error("Database error fetching comprehensive tech stack registry:", error);
        return []; // Safeguard the UI by returning an empty array on failure bounds
    }
}