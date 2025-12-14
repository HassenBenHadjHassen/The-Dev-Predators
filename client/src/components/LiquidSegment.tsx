
import { memo } from "react";
import { LiquidColor } from "@/types/game";

interface LiquidSegmentProps {
  color: LiquidColor;
  position: number;
  height: number;
  isTop: boolean;
  isBeingPoured: boolean;
}

const LiquidSegment = memo(({ color, position, height, isTop, isBeingPoured }: LiquidSegmentProps) => {
  // Using the actual color value from Tailwind instead of CSS variable
  const getColorClass = (liquidColor: LiquidColor): string => {
    switch (liquidColor) {
      case "liquid-red": return "bg-liquid-red";
      case "liquid-blue": return "bg-liquid-blue";
      case "liquid-green": return "bg-liquid-green";
      case "liquid-yellow": return "bg-liquid-yellow";
      case "liquid-purple": return "bg-liquid-purple";
      case "liquid-orange": return "bg-liquid-orange";
      case "liquid-teal": return "bg-liquid-teal";
      case "liquid-pink": return "bg-liquid-pink";
      default: return "bg-gray-400"; // Fallback color
    }
  };

  return (
    <div
      className={`liquid-segment ${getColorClass(color)} ${isBeingPoured ? 'animate-pulse-soft' : ''}`}
      style={{
        height: `${height}%`,
        bottom: `${position}%`,
        borderTopLeftRadius: isTop ? '8px' : '0',
        borderTopRightRadius: isTop ? '8px' : '0',
        zIndex: 10 - position,
        boxShadow: isTop ? 'inset 0 2px 4px rgba(255, 255, 255, 0.2)' : 'none'
      }}
    >
      {/* Bubbles effect for top segments */}
      {isTop && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-bubble left-2 bottom-0"></div>
          <div className="absolute w-1.5 h-1.5 bg-white/20 rounded-full animate-bubble left-8 bottom-0" style={{ animationDelay: '0.8s' }}></div>
        </div>
      )}
    </div>
  );
});

export default LiquidSegment;
