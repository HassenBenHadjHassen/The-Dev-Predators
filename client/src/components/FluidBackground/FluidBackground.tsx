import { useEffect, useRef } from 'react';
import './FluidBackground.css';
// @ts-ignore
import { runSimulation } from './fluid.js';

const FluidBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            // The original script might need some adjustments to work with cleanup
            // For now, we just run it.
            runSimulation(canvasRef.current);
        }
    }, []);

    return <canvas ref={canvasRef} />;
};

export default FluidBackground;
