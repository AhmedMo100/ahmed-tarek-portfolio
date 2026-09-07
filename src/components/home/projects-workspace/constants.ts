/**
 * @file constants.ts
 * @package src/components/home/project-workspace
 * @preview Shared constants used throughout the Project Workspace feature.
 */

/* -------------------------------------------------------------------------- */
/* Workspace Tree                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Virtual root folder containing applications.
 */
export const WORKSPACE_ROOT = "apps";

/**
 * Virtual root folder containing shared packages.
 */
export const SHARED_PACKAGES_ROOT = "packages";

/* -------------------------------------------------------------------------- */
/* Animation                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Default animation duration (seconds).
 */
export const DEFAULT_TRANSITION_DURATION = 0.25;

/**
 * Default spring stiffness.
 */
export const DEFAULT_SPRING_STIFFNESS = 420;

/**
 * Default spring damping.
 */
export const DEFAULT_SPRING_DAMPING = 32;

/* -------------------------------------------------------------------------- */
/* Layout                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Maximum number of technologies shown before collapsing.
 */
export const MAX_VISIBLE_TECHNOLOGIES = 8;

/**
 * Maximum number of shared packages shown before collapsing.
 */
export const MAX_VISIBLE_PACKAGES = 6;

/* -------------------------------------------------------------------------- */
/* External Resources                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Opens external resources in a separate browsing context.
 */
export const EXTERNAL_LINK_TARGET = "_blank";

/**
 * Prevents the opened page from accessing the current window.
 */
export const EXTERNAL_LINK_REL = "noopener noreferrer";