/**
 * @file animations.ts
 * @package src/components/home/project-workspace
 * @preview Shared Framer Motion animation presets.
 */

import type { Variants } from "framer-motion";

/**
 * Standard fade animation.
 */
export const fadeIn: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.35,
        },
    },
};

/**
 * Vertical slide animation.
 */
export const slideUp: Variants = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
        },
    },
};

/**
 * Scale animation.
 */
export const scaleIn: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.96,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.35,
        },
    },
};

/**
 * Stagger container animation.
 */
export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};