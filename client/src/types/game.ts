
export type LiquidColor = 
  | "liquid-red" 
  | "liquid-blue" 
  | "liquid-green" 
  | "liquid-yellow" 
  | "liquid-purple" 
  | "liquid-orange" 
  | "liquid-teal" 
  | "liquid-pink";

export interface LiquidSegment {
  id: string;
  color: LiquidColor;
}

export interface Tube {
  id: string;
  capacity: number;
  segments: LiquidSegment[];
  selected: boolean;
}

export interface GameState {
  tubes: Tube[];
  moves: number;
  moveHistory: Tube[][];
  levelId: number;
  isComplete: boolean;
}

export interface GameContextType {
  gameState: GameState;
  unlockedLevels: number[];
  completedLevels: number[];
  selectTube: (tubeId: string) => void;
  resetLevel: () => void;
  undoMove: () => void;
  loadLevel: (levelId: number) => void;
}
