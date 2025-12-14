
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { RefreshCcw, Undo2, Home, SkipForward } from "lucide-react";

interface GameControlsProps {
  onNextLevel?: () => void;
}

const GameControls = ({ onNextLevel }: GameControlsProps) => {
  const { resetLevel, undoMove, gameState, completedLevels } = useGame();
  const navigate = useNavigate();

  const isCurrentLevelCompleted = completedLevels.includes(gameState.levelId);

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center items-center gap-4 px-4 animate-float-in">
      <Button
        variant="outline"
        size="icon"
        className="h-12 w-12 rounded-full bg-secondary shadow-sm border border-border hover:bg-secondary/80"
        onClick={() => navigate('/')}
      >
        <Home className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="h-12 w-12 rounded-full bg-secondary shadow-sm border border-border hover:bg-secondary/80"
        onClick={undoMove}
      >
        <Undo2 className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="h-12 w-12 rounded-full bg-secondary shadow-sm border border-border hover:bg-secondary/80"
        onClick={resetLevel}
      >
        <RefreshCcw className="h-5 w-5" />
      </Button>

      {gameState.isComplete && onNextLevel && (
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={onNextLevel}
          disabled={!isCurrentLevelCompleted}
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default GameControls;
