/**
 * @file ProjectsGrid.tsx
 * @package src/components/projects
 * @description Renders the projects list using a layout-aware grid system.
 * Uses Framer Motion for smooth exit/enter animations during filtering.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./project-card";
import { LocalizedProject } from "@/services/projects";

interface ProjectsGridProps {
    projects: LocalizedProject[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
    // حالة لا يوجد مشاريع في الفلتر المختار
    if (projects.length === 0) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center text-muted-foreground"
            >
                <p>No projects found in this category.</p>
            </motion.div>
        );
    }

    return (
        <div className="container mx-auto px-4 pb-20">
            <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 300, 
                                damping: 30 
                            }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}