
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGame } from "@/context/GameContext";
import { useCompanion } from "@/context/CompanionContext";
import Tube from "@/components/Tube";
import GameControls from "@/components/GameControls";

const Game = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const { gameState, loadLevel, unlockedLevels, completedLevels } = useGame();
  const { triggerCheer, triggerCheckIn } = useCompanion();
  const navigate = useNavigate();
  const [isLevelLoaded, setIsLevelLoaded] = useState(false);

  useEffect(() => {
    // Parse level ID from URL
    const parsedLevelId = parseInt(levelId || "1");

    // Check if the level is unlocked
    if (!unlockedLevels.includes(parsedLevelId)) {
      navigate('/levels');
      return;
    }

    // Prevent multiple loadLevel calls
    if (!isLevelLoaded) {
      loadLevel(parsedLevelId);
      setIsLevelLoaded(true);
    }
  }, [levelId, loadLevel, navigate, unlockedLevels, isLevelLoaded]);

  // Reset the loaded state when the level changes
  useEffect(() => {
    setIsLevelLoaded(false);
  }, [levelId]);

  // Trigger cheer when level is completed
  useEffect(() => {
    if (completedLevels.includes(gameState.levelId)) {
      triggerCheer();
    }
  }, [completedLevels, gameState.levelId, triggerCheer]);

  // Periodic check-in every 3 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      triggerCheckIn();
    }, 180000);
    return () => clearInterval(interval);
  }, [triggerCheckIn]);


  const handleNextLevel = () => {
    const nextLevelId = gameState.levelId + 1;

    // Only allow progression if the current level is completed
    if (completedLevels.includes(gameState.levelId) && unlockedLevels.includes(nextLevelId)) {
      navigate(`/game/${nextLevelId}`);
    }
  };

  return (
    <div className="min-h-screen p-6 subtle-pattern bg-background">
      <div className="glass-panel p-4 mb-4 flex items-center justify-between animate-float-in">
        <h1 className="text-xl font-medium">Level {gameState.levelId}</h1>
        <div className="text-muted-foreground">Moves: {gameState.moves}</div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 my-8 animate-scale-in">
        {gameState.tubes.map(tube => (
          <Tube key={tube.id} tube={tube} />
        ))}
      </div>

      <GameControls onNextLevel={handleNextLevel} />
    </div>
  );
};

export default Game;
