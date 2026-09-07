/**
 * @file projects-dropdown.tsx
 */
"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { LocalizedProject } from "@/services/projects"; // استيراد النوع الصحيح

interface ProjectsDropdownProps {
    projects: LocalizedProject[]; // استخدام النوع الصحيح هنا
    isOpen: boolean;
}

export const ProjectsDropdown = ({ projects, isOpen }: ProjectsDropdownProps) => {
    const t = useTranslations("ProjectsDropdown");

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-[600px] mt-2 p-6 rounded-2xl shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 z-50 overflow-hidden"
                >
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('/assets/tech-doodles.svg')] bg-repeat" />

                    <div className="grid grid-cols-2 gap-4 relative z-10">
                        {projects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/projects/${project.slug}`}
                                className="group flex flex-col p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                            >
                                <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#6366f1]">
                                    {project.title}
                                </span>
                                <span className="text-xs text-slate-500 line-clamp-1 mt-1">
                                    {project.description}
                                </span>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center relative z-10">
                        <Link
                            href="/projects"
                            className="inline-block px-6 py-2 bg-[#6366f1] text-white rounded-full font-medium text-sm hover:bg-[#4f46e5] transition-all"
                        >
                            {t("show-more")}
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};