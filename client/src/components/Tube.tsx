
import { memo } from "react";
import { useGame } from "@/context/GameContext";
import { Tube as TubeType } from "@/types/game";
import LiquidSegment from "./LiquidSegment";

interface TubeProps {
  tube: TubeType;
}

const Tube = memo(({ tube }: TubeProps) => {
  const { selectTube } = useGame();
  const segmentHeight = 100 / tube.capacity; // percentage of total height
  
  return (
    <div 
      className={`tube ${tube.selected ? 'tube-selected' : ''} transition-all duration-300`}
      onClick={() => selectTube(tube.id)}
    >
      <div className="tube-rim"></div>
      <div className="tube-shine"></div>
      
      {tube.segments.map((segment, index) => (
        <LiquidSegment
          key={segment.id}
          color={segment.color}
          position={(tube.segments.length - 1 - index) * segmentHeight}
          height={segmentHeight}
          isTop={index === 0}
          isBeingPoured={tube.selected && index === 0}
        />
      ))}
    </div>
  );
});

export default Tube;
