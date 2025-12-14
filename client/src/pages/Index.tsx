
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { Beaker } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { completedLevels, unlockedLevels } = useGame();
  const lastUnlockedLevel = Math.max(...unlockedLevels);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background subtle-pattern">
      <div className="max-w-md w-full mx-auto animate-scale-in glass-panel p-8">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full flex items-center justify-center bg-primary/10 backdrop-blur-md">
            <Beaker className="h-12 w-12 text-primary" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mb-2">Liquid Sort</h1>
        <p className="text-center text-muted-foreground mb-8">
          Sort the colored liquids until each tube contains only one color
        </p>

        <div className="space-y-4">
          <Button
            className="w-full h-12 text-lg"
            onClick={() => navigate(`/game/${lastUnlockedLevel}`)}
          >
            {completedLevels.length > 0 ? 'Continue' : 'Start'}
          </Button>

        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {completedLevels.length} / 1000 Levels Completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
