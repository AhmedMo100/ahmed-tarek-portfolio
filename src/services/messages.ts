"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

// Validation Schema
const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    subject: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 chars"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function sendContactMessage(data: ContactFormData) {
    // Server-side Validation
    const validated = contactSchema.safeParse(data);
    if (!validated.success) return { success: false, error: "Invalid data" };

    try {
        await prisma.message.create({
            data: validated.data,
        });
        return { success: true };
    } catch (error) {
        console.error("DB Error:", error);
        return { success: false, error: "Server error" };
    }
}