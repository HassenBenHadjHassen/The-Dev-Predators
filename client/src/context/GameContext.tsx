
import React, { createContext, useContext } from "react";
import { useGameState } from "@/hooks/useGameState";
import type { GameContextType } from "@/types/game";

export * from "@/types/game";

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    gameState,
    unlockedLevels,
    completedLevels,
    selectTube,
    resetLevel,
    undoMove,
    loadLevel
  } = useGameState();

  return (
    <GameContext.Provider value={{
      gameState,
      unlockedLevels,
      completedLevels,
      selectTube,
      resetLevel,
      undoMove,
      loadLevel
    }}>
      {children}
    </GameContext.Provider>
  );
};
