import { Tube, LiquidColor } from "@/types/game";

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
export const generateLevelByDifficulty = (difficulty: Difficulty): Tube[] => {
    const params = getDifficultyParams(difficulty);
    const tubeHeight = 4;

    // Randomize colors count within range
    const numColors = Math.floor(Math.random() * (params.maxColors - params.minColors + 1)) + params.minColors;
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

/**
 * Generates a level based on the level number (Backward Compatibility)
 */
export const generateLevel = (levelNumber: number): Tube[] => {
    // Simple mapping of level number to difficulty for progressive play
    let difficulty: Difficulty = 'easy';
    if (levelNumber > 20) difficulty = 'medium';
    if (levelNumber > 50) difficulty = 'hard';

    // Use the new generator logic but slightly customized to match original progression if needed
    // For now, we delegate to the difficulty generator to enable the new logic
    return generateLevelByDifficulty(difficulty);
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
