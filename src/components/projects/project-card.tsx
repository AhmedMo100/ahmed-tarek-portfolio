/**
 * @file ProjectCard.tsx
 * @package src/components/projects
 * @description Modern Bento-style project card with interactive hover states.
 */

"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Globe, ExternalLink } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { LocalizedProject } from "@/services/projects";
import Link from "next/link";
import Image from "next/image";


interface ProjectCardProps {
    project: LocalizedProject;
}


export function ProjectCard({
    project,
}: ProjectCardProps) {


    const t =
        useTranslations("ProjectsPage.cta");



    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 20,
            }}

            animate={{
                opacity: 1,
                y: 0,
            }}

            transition={{
                duration: 0.45,
            }}

            whileHover={{
                y: -5,
            }}

            className="
                group relative
                bg-card
                border border-border
                rounded-2xl
                overflow-hidden
                p-6
                flex flex-col
                h-full
                hover:border-primary/50
                transition-all
                duration-300
            "

        >


            {/* Project Cover Image */}

            <motion.div

                className="
                    relative
                    w-full
                    overflow-hidden
                    rounded-xl
                    mb-4
                "

                whileHover={{
                    scale: 1.02,
                }}

                transition={{
                    duration: 0.3,
                }}

            >

                <Image

                    src={project.coverImage}

                    alt={project.title}

                    width={800}

                    height={450}

                    className="
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                    "

                />


                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/30
                        via-transparent
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-300
                    "
                />

            </motion.div>




            {/* Header: Tech Stack */}

            <div className="flex flex-wrap gap-2 mb-4">

                {project.technologies
                    .slice(0, 3)
                    .map((tech) => (

                    <span

                        key={tech}

                        className="
                            px-2
                            py-1
                            bg-muted
                            text-muted-foreground
                            text-[10px]
                            uppercase
                            tracking-wider
                            font-bold
                            rounded-md
                        "

                    >

                        {tech}

                    </span>

                ))}

            </div>





            {/* Title & Description */}

            <h3

                className="
                    text-xl
                    font-bold
                    mb-2
                    group-hover:text-primary
                    transition-colors
                "

            >

                {project.title}

            </h3>



            <p

                className="
                    text-muted-foreground
                    text-sm
                    leading-relaxed
                    mb-6
                    flex-grow
                "

            >

                {project.description}

            </p>





            {/* Footer: Links */}

            <div

                className="
                    flex
                    items-center
                    gap-3
                    pt-4
                    border-t
                    border-border
                "

            >

                {project.liveUrl && (

                    <Link

                        href={project.liveUrl}

                        className="
                            text-foreground/60
                            hover:text-primary
                            transition-colors
                        "

                    >

                        <Globe size={18} />

                    </Link>

                )}



                {project.githubFront && (

                    <Link

                        href={project.githubFront}

                        className="
                            text-foreground/60
                            hover:text-primary
                            transition-colors
                        "

                        title={t("front")}

                    >

                        <Github size={18} />

                    </Link>

                )}



                {project.githubBack && (

                    <Link

                        href={project.githubBack}

                        className="
                            text-foreground/60
                            hover:text-primary
                            transition-colors
                        "

                        title={t("back")}

                    >

                        <ExternalLink size={18} />

                    </Link>

                )}






                {/* View Details Button */}

                <Link

                    href={`/projects/${project.slug}`}

                    className="
                        ml-auto
                        text-[12px]
                        font-bold
                        uppercase
                        hover:text-primary
                        transition-colors
                    "

                >

                    View Case →

                </Link>


            </div>


        </motion.div>

    );

}