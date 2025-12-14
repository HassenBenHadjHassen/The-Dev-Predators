import type { Tube, LiquidColor } from "@/types/game";

// Available liquid colors
const LIQUID_COLORS: LiquidColor[] = [
    "liquid-red",
    "liquid-blue",
    "liquid-green",
    "liquid-yellow",
    "liquid-purple",
    "liquid-orange",
    "liquid-teal",
    "liquid-pink"
];

export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * Generates a unique ID
 */
const generateId = (): string => {
    return Math.random().toString(36).substring(2, 9);
};

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

/**
 * Generates parameters based on difficulty
 */
const getDifficultyParams = (difficulty: Difficulty) => {
    switch (difficulty) {
        case 'easy':
            return { minColors: 3, maxColors: 4, emptyTubes: 2 };
        case 'medium':
            return { minColors: 5, maxColors: 7, emptyTubes: 2 };
        case 'hard':
            return { minColors: 8, maxColors: 12, emptyTubes: 1 };
    }
};

/**
 * Generates a level based on difficulty
 * @param difficulty - The difficulty level ('easy', 'medium', 'hard')
 * @param seed - Optional random seed (simplified usage here)
 */
export const generateLevelByDifficulty = (difficulty: Difficulty, modifier: number = 0): Tube[] => {
    const params = getDifficultyParams(difficulty);
    const tubeHeight = 4;

    // Adjust params based on modifier
    // Positive modifier = Harder (more colors)
    // Negative modifier = Easier (fewer colors)
    let adjustedMaxKeywords = params.maxColors + modifier;
    let adjustedMinKeywords = params.minColors + Math.floor(modifier / 2);

    // Keep within reasonable bounds
    if (adjustedMinKeywords < 3) adjustedMinKeywords = 3;
    if (adjustedMaxKeywords > LIQUID_COLORS.length) adjustedMaxKeywords = LIQUID_COLORS.length;
    // Ensure max >= min
    if (adjustedMaxKeywords < adjustedMinKeywords) adjustedMaxKeywords = adjustedMinKeywords;

    // Randomize colors count within range
    const numColors = Math.floor(Math.random() * (adjustedMaxKeywords - adjustedMinKeywords + 1)) + adjustedMinKeywords;
    const activeColors = LIQUID_COLORS.slice(0, Math.min(numColors, LIQUID_COLORS.length));

    const numTubes = numColors + params.emptyTubes;

    // Generate the colored liquid segments
    const segments: { id: string; color: LiquidColor }[] = [];

    for (let i = 0; i < numColors; i++) {
        const color = activeColors[i];
        for (let j = 0; j < tubeHeight; j++) {
            segments.push({ id: generateId(), color });
        }
    }

    // Shuffle the segments
    const shuffledSegments = shuffleArray(segments);

    // Create tubes
    const tubes: Tube[] = [];

    // Add tubes with liquid
    for (let i = 0; i < numColors; i++) {
        const tubeSegments = shuffledSegments.slice(i * tubeHeight, (i + 1) * tubeHeight);
        tubes.push({
            id: `tube-${i}`,
            capacity: tubeHeight,
            segments: tubeSegments,
            selected: false
        });
    }

    // Add empty tubes
    for (let i = numColors; i < numTubes; i++) {
        tubes.push({
            id: `tube-${i}`,
            capacity: tubeHeight,
            segments: [],
            selected: false
        });
    }

    return tubes;
};

export const generateLevel = (levelNumber: number, difficultyModifier: number = 0): Tube[] => {
    // Logic from plan: baseTubes = 3 + floor(level/2)
    // Adjusted by difficulty modifier
    const baseTubes = 3 + Math.floor(levelNumber / 2);
    const targetTubes = Math.max(3, baseTubes + Math.floor(difficultyModifier));

    // Determine complexity for the generator
    // We map 'tubes' to 'difficulty' settings expected by the helper or call it directly
    // Since generateLevelByDifficulty uses buckets, we might need to adapt it 
    // OR just use the 'targetTubes' to drive the colors.

    // Let's refactor to use targetTubes directly.
    // Assuming 2 empty tubes standard, 1 for hard.
    const emptyTubes = targetTubes > 8 ? 1 : 2;
    const numColors = Math.max(2, targetTubes - emptyTubes);

    // Map strict colors count to difficulty params for the existing generator
    // The existing generator calculates numColors based on min/max.
    // We want EXACT control or close to it.

    // Let's use a new helper or modify the existing one to accept specific tube count?
    // The existing 'generateLevelByDifficulty' does `numColors = rand(min, max)`.
    // We can just set min=max=numColors.

    // Calculate 'difficulty' enum just for satisfy signature if needed, 
    // but mostly we want to pass specific constraints.
    // Since generateLevelByDifficulty logic is:
    // adjustedMax = params.max + mod

    // Instead of fighting the existing function, let's create a direct generator 
    // or call it with a "custom" difficulty object if we could, 
    // but here we are replacing 'generateLevel'.

    // Let's call generateLevelByDifficulty but with a "virtual" modifier that aligns with our target?
    // No, that's complex.
    // Let's just implement the logic here directly or create a specific helper.
    // For minimal code churn, I will adapt generateLevelByDifficulty to respect an override 
    // OR just write the generation logic here since it shares 'generateLevelByDifficulty' structure.

    return generateLevelByParams(numColors, emptyTubes);
};

// Helper to generate specific level
const generateLevelByParams = (numColors: number, emptyTubes: number): Tube[] => {
    const tubeHeight = 4;
    const activeColors = LIQUID_COLORS.slice(0, Math.min(numColors, LIQUID_COLORS.length));
    const numTubes = numColors + emptyTubes;

    // Generate segments
    const segments: { id: string; color: LiquidColor }[] = [];
    for (let i = 0; i < numColors; i++) {
        const color = activeColors[i];
        for (let j = 0; j < tubeHeight; j++) {
            segments.push({ id: generateId(), color });
        }
    }

    const shuffledSegments = shuffleArray(segments);
    const tubes: Tube[] = [];

    // Fill tubes
    for (let i = 0; i < numColors; i++) {
        const tubeSegments = shuffledSegments.slice(i * tubeHeight, (i + 1) * tubeHeight);
        tubes.push({
            id: `tube-${i}`,
            capacity: tubeHeight,
            segments: tubeSegments,
            selected: false
        });
    }

    // Empty tubes
    for (let i = numColors; i < numTubes; i++) {
        tubes.push({
            id: `tube-${i}`,
            capacity: tubeHeight,
            segments: [],
            selected: false
        });
    }

    return tubes;
};

/**
 * Predefined levels for the first few levels to ensure a smooth learning curve
 */
export const getPredefinedLevel = (levelNumber: number): Tube[] | null => {
    if (levelNumber === 1) {
        // First level: 2 colors, 3 tubes (1 empty)
        return [
            {
                id: "tube-0",
                capacity: 4,
                segments: [
                    { id: "seg-1", color: "liquid-red" },
                    { id: "seg-2", color: "liquid-blue" },
                    { id: "seg-3", color: "liquid-blue" },
                    { id: "seg-4", color: "liquid-red" },
                ],
                selected: false
            },
            {
                id: "tube-1",
                capacity: 4,
                segments: [
                    { id: "seg-5", color: "liquid-blue" },
                    { id: "seg-6", color: "liquid-red" },
                    { id: "seg-7", color: "liquid-red" },
                    { id: "seg-8", color: "liquid-blue" },
                ],
                selected: false
            },
            {
                id: "tube-2",
                capacity: 4,
                segments: [],
                selected: false
            }
        ];
    }

    // If no predefined level, return null
    return null;
};
