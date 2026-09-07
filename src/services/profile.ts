/**
 * @file profile.ts
 * @package src/services
 * @preview Data access layer for retrieving developer meta-data and profile narrative with strict typing.
 */

import prisma from "@/lib/prisma";

export interface DeveloperProfile {
    id: string;
    bioEn: string;
    bioAr: string;
    aboutTextEn: string;
    aboutTextAr: string;
    cvUrl: string;
}

/**
 * Fetches the developer's primary profile record from the database.
 * @function getProfile
 * @returns {Promise<DeveloperProfile | null>} The developer profile object or null if not found.
 */
export async function getProfile(): Promise<DeveloperProfile | null> {
    try {
        return await prisma.profile.findFirst({
            select: { 
                id: true, 
                bioEn: true, 
                bioAr: true, 
                aboutTextEn: true, 
                aboutTextAr: true, 
                cvUrl: true 
            }
        });
    } catch (error) {
        console.error("Error fetching developer profile:", error);
        return null;
    }
}