import type { Tube } from "@/types/game";

/**
 * Checks if a level is complete
 * A level is complete when all tubes either:
 * 1. Are empty OR
 * 2. Are full with segments of the same color
 */
export const checkLevelComplete = (tubes: Tube[]): boolean => {
  for (const tube of tubes) {
    // Skip empty tubes
    if (tube.segments.length === 0) continue;
    
    // If tube is not full, level is not complete
    if (tube.segments.length !== tube.capacity) return false;
    
    // Check if all segments in the tube are the same color
    const firstColor = tube.segments[0].color;
    const allSameColor = tube.segments.every(segment => segment.color === firstColor);
    
    if (!allSameColor) return false;
  }
  
  return true;
};

/**
 * Attempts to pour liquid from source tube to target tube
 * Returns success status and updated tubes
 */
export const pourLiquid = (
  sourceTube: Tube,
  targetTube: Tube
): { 
  success: boolean; 
  error?: string;
  sourceTube: Tube;
  targetTube: Tube;
} => {
  // Cannot pour if source tube is empty
  if (sourceTube.segments.length === 0) {
    return { 
      success: false, 
      error: "Source tube is empty",
      sourceTube,
      targetTube
    };
  }
  
  // Cannot pour if target tube is full
  if (targetTube.segments.length >= targetTube.capacity) {
    return { 
      success: false, 
      error: "Target tube is full",
      sourceTube,
      targetTube
    };
  }
  
  const sourceTopSegment = sourceTube.segments[sourceTube.segments.length - 1];
  
  // If target tube is not empty, can only pour if colors match
  if (targetTube.segments.length > 0) {
    const targetTopSegment = targetTube.segments[targetTube.segments.length - 1];
    
    if (sourceTopSegment.color !== targetTopSegment.color) {
      return { 
        success: false, 
        error: "Colors don't match",
        sourceTube,
        targetTube
      };
    }
  }
  
  // Determine how many segments to pour (all consecutive same-colored segments from top)
  const topColor = sourceTopSegment.color;
  let pourCount = 0;
  let spaceInTarget = targetTube.capacity - targetTube.segments.length;
  
  // Count consecutive same-colored segments from top of source tube
  for (let i = sourceTube.segments.length - 1; i >= 0; i--) {
    if (sourceTube.segments[i].color === topColor && pourCount < spaceInTarget) {
      pourCount++;
    } else {
      break;
    }
  }
  
  // Move segments from source to target
  const segmentsToMove = sourceTube.segments.slice(-pourCount);
  const newSourceSegments = sourceTube.segments.slice(0, -pourCount);
  const newTargetSegments = [...targetTube.segments, ...segmentsToMove];
  
  const updatedSourceTube = {
    ...sourceTube,
    segments: newSourceSegments
  };
  
  const updatedTargetTube = {
    ...targetTube,
    segments: newTargetSegments
  };
  
  return {
    success: true,
    sourceTube: updatedSourceTube,
    targetTube: updatedTargetTube
  };
};
