import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

// Import all sections
import { speedIntroductionBlocks } from "./sections/SpeedIntroduction";
import { distanceSectionBlocks } from "./sections/DistanceSection";
import { timeSectionBlocks } from "./sections/TimeSection";
import { speedFormulaSectionBlocks } from "./sections/SpeedFormulaSection";
import { unitsSectionBlocks } from "./sections/UnitsSection";
import { practiceSectionBlocks } from "./sections/PracticeSection";

/**
 * Speed Lesson
 * =============
 * An interactive lesson on speed for primary school students (ages 7-12).
 *
 * Sections:
 * 1. What is Speed? - Introduction to the concept
 * 2. Distance - Understanding how far
 * 3. Time - Understanding how long
 * 4. The Speed Formula - With animal race visualization
 * 5. Units of Speed - m/s and km/h
 * 6. Practice Time - Interactive questions with feedback
 */

export const blocks: ReactElement[] = [
    ...speedIntroductionBlocks,
    ...distanceSectionBlocks,
    ...timeSectionBlocks,
    ...speedFormulaSectionBlocks,
    ...unitsSectionBlocks,
    ...practiceSectionBlocks,
];
