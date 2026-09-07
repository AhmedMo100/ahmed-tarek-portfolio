/**
 * @file types.ts
 * @package src/components/home/project-workspace
 * @preview Shared type definitions for the Project Workspace feature.
 */

import type { LocalizedProject } from "@/services/projects";

/**
 * Represents the currently selected project inside
 * the interactive workspace explorer.
 */
export type ActiveProject = LocalizedProject | null;

/**
 * Generic callback fired whenever the active project changes.
 */
export type ProjectSelectionHandler = (
    project: LocalizedProject
) => void;

/**
 * Shared animation state names.
 */
export type WorkspaceAnimationState =
    | "hidden"
    | "visible"
    | "exit";