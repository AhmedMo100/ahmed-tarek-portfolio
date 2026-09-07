"use client";

/**

* @file section-divider.tsx
* @package src/components/shared
* @description
* Reusable animated visual divider for page sections.
  */

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

import type { LucideIcon } from "lucide-react";

interface SectionDividerProps {
    icon?: LucideIcon;
    className?: string;
    delay?: number;
}

export function SectionDivider({
    icon: Icon = Code2,
    className = "",
    delay = 0.25,
}: SectionDividerProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scaleX: 0.7,
            }}
            whileInView={{
                opacity: 1,
                scaleX: 1,
            }}
            viewport={{
                once: true,
                amount: 0.2,
            }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={`                 relative
                mx-auto
                flex
                w-full
                max-w-5xl
                items-center
                ${className}
            `}
        >
            {/* Left Line */}

            <div
                aria-hidden="true"
                className="
                h-px
                flex-1
                bg-linear-to-r
                from-transparent
                via-primary/35
                to-primary/40
            "
            />

            {/* Center Symbol */}

            <div
                className="
                relative
                z-10
                flex
                shrink-0
                items-center
                gap-2
                bg-background
                px-4
            "
            >
                <span
                    className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-primary
                    shadow-[0_0_10px_var(--primary)]
                "
                />

                <span className="h-px w-6 bg-primary/40 sm:w-8" />

                <Icon className="h-3.5 w-3.5 text-primary" />

                <span className="h-px w-6 bg-primary/40 sm:w-8" />

                <span
                    className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-primary
                    shadow-[0_0_10px_var(--primary)]
                "
                />
            </div>

            {/* Right Line */}

            <div
                aria-hidden="true"
                className="
                h-px
                flex-1
                bg-linear-to-r
                from-primary/40
                via-primary/35
                to-transparent
            "
            />
        </motion.div>
    );

}
