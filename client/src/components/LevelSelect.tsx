
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const LEVELS_PER_PAGE = 24;

const LevelSelect = () => {
  const { unlockedLevels, completedLevels, loadLevel } = useGame();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Preload the first few levels
    for (let i = 1; i <= 3; i++) {
      if (unlockedLevels.includes(i)) {
        loadLevel(i);
      }
    }
  }, []);
  
  const handleLevelSelect = (levelId: number) => {
    if (unlockedLevels.includes(levelId)) {
      navigate(`/game/${levelId}`);
    }
  };
  
  const renderLevelButton = (levelId: number) => {
    const isCompleted = completedLevels.includes(levelId);
    const isUnlocked = unlockedLevels.includes(levelId);
    
    let className = "level-button ";
    if (isCompleted) {
      className += "level-completed";
    } else if (isUnlocked) {
      className += "level-unlocked";
    } else {
      className += "level-locked";
    }
    
    return (
      <button
        key={levelId}
        className={className}
        onClick={() => handleLevelSelect(levelId)}
        disabled={!isUnlocked}
      >
        {levelId}
      </button>
    );
  };
  
  const renderLevelGrid = () => {
    // For the MVP, show first 100 levels
    const totalLevels = 100;
    const levelButtons = [];
    
    for (let i = 1; i <= totalLevels; i++) {
      levelButtons.push(renderLevelButton(i));
    }
    
    return levelButtons;
  };
  
  return (
    <div className="min-h-screen p-6 subtle-pattern bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            className="mr-2"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Select Level</h1>
        </div>
        
        <div className="glass-panel p-6">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {renderLevelGrid()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;
