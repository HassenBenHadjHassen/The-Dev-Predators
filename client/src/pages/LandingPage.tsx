import FluidBackground from '../components/FluidBackground/FluidBackground';
import { useState } from 'react';
// ... existing code ...

const LandingPage = () => {
    const [isHover, setIsHover] = useState(false);
    const [isActive, setIsActive] = useState(false);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            <FluidBackground />
            <div style={{ zIndex: 1, textAlign: 'center' }}>
                <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Welcome to the Future</h1>
                <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Experience the fluid motion.</p>
                <button style={{
                    padding: '1rem 2rem',
                    fontSize: '1.2rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    transition: 'background 0.3s'
                }}>
                    Get Started
                </button>
            </div>
        </div>
    );
};
// ... existing code ...

export default LandingPage;
// ... existing code ...
