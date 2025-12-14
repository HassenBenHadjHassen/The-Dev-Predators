
import { useState, useEffect } from "react";
import { generateLevel } from "@/utils/levelGenerator";
import { checkLevelComplete, pourLiquid } from "@/utils/gameLogic";
import { toast } from "@/components/ui/use-toast";
import { GameState, Tube } from "@/types/game";

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    tubes: [],
    moves: 0,
    moveHistory: [],
    levelId: 1,
    isComplete: false
  });

  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  // Load saved game data from localStorage
  useEffect(() => {
    const savedUnlockedLevels = localStorage.getItem("unlockedLevels");
    const savedCompletedLevels = localStorage.getItem("completedLevels");
    
    if (savedUnlockedLevels) {
      setUnlockedLevels(JSON.parse(savedUnlockedLevels));
    }
    
    if (savedCompletedLevels) {
      setCompletedLevels(JSON.parse(savedCompletedLevels));
    }
  }, []);

  // Save game data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("unlockedLevels", JSON.stringify(unlockedLevels));
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
  }, [unlockedLevels, completedLevels]);

  // Check if level is complete
  useEffect(() => {
    if (gameState.tubes.length > 0 && checkLevelComplete(gameState.tubes)) {
      setGameState(prev => ({ ...prev, isComplete: true }));
      if (!completedLevels.includes(gameState.levelId)) {
        setCompletedLevels(prev => [...prev, gameState.levelId]);
      }
      if (!unlockedLevels.includes(gameState.levelId + 1)) {
        setUnlockedLevels(prev => [...prev, gameState.levelId + 1]);
      }
      toast({
        title: "Level Complete!",
        description: `You completed level ${gameState.levelId} in ${gameState.moves} moves!`,
      });
    }
  }, [gameState.tubes, gameState.levelId, completedLevels, unlockedLevels]);

  const loadLevel = (levelId: number) => {
    const level = generateLevel(levelId);
    setGameState({
      tubes: level,
      moves: 0,
      moveHistory: [JSON.parse(JSON.stringify(level))],
      levelId,
      isComplete: false
    });
  };

  const selectTube = (tubeId: string) => {
    if (gameState.isComplete) return;

    const selectedTube = gameState.tubes.find(tube => tube.selected);
    const targetTube = gameState.tubes.find(tube => tube.id === tubeId);

    if (!targetTube) return;

    if (!selectedTube) {
      // No tube selected yet, select this one if it's not empty
      if (targetTube.segments.length === 0) return;

      setGameState(prev => ({
        ...prev,
        tubes: prev.tubes.map(tube => 
          tube.id === tubeId ? { ...tube, selected: true } : tube
        )
      }));
    } else if (selectedTube.id === tubeId) {
      // Deselect the currently selected tube
      setGameState(prev => ({
        ...prev,
        tubes: prev.tubes.map(tube => 
          tube.id === tubeId ? { ...tube, selected: false } : tube
        )
      }));
    } else {
      // Try to pour from selected tube to target tube
      const result = pourLiquid(selectedTube, targetTube);
      
      if (result.success) {
        // Add current state to history before making the move
        const newTubes = gameState.tubes.map(tube => {
          if (tube.id === selectedTube.id) return { ...result.sourceTube, selected: false };
          if (tube.id === targetTube.id) return result.targetTube;
          return tube;
        });
        
        setGameState(prev => ({
          ...prev,
          tubes: newTubes,
          moves: prev.moves + 1,
          moveHistory: [...prev.moveHistory, JSON.parse(JSON.stringify(newTubes))]
        }));
      } else {
        // Invalid move, just deselect the tube
        setGameState(prev => ({
          ...prev,
          tubes: prev.tubes.map(tube => ({ ...tube, selected: false }))
        }));
        
        toast({
          title: "Invalid Move",
          description: result.error,
          variant: "destructive"
        });
      }
    }
  };

  const resetLevel = () => {
    loadLevel(gameState.levelId);
  };

  const undoMove = () => {
    if (gameState.moveHistory.length > 1) {
      const previousState = gameState.moveHistory[gameState.moveHistory.length - 2];
      setGameState(prev => ({
        ...prev,
        tubes: previousState.map(tube => ({ ...tube, selected: false })),
        moves: prev.moves > 0 ? prev.moves - 1 : 0,
        moveHistory: prev.moveHistory.slice(0, -1),
        isComplete: false
      }));
    }
  };

  return {
    gameState,
    unlockedLevels,
    completedLevels,
    selectTube,
    resetLevel,
    undoMove,
    loadLevel,
    setCompletedLevels,
    setUnlockedLevels
  };
};
