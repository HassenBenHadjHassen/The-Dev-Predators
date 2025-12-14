// ... existing code ...
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
                <button
                    aria-label="Get Started"
                    title="Get Started"
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => { setIsHover(false); setIsActive(false); }}
                    onMouseDown={() => setIsActive(true)}
                    onMouseUp={() => setIsActive(false)}
                    onFocus={() => setIsHover(true)}
                    onBlur={() => { setIsHover(false); setIsActive(false); }}
                    style={{
                        padding: '1.2rem 2.4rem',        
                        fontSize: '1.6rem',               
                        fontWeight: 700,                   
                        letterSpacing: '0.03em',
                        background: '#0B5FFF',           
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        boxShadow: isActive ? '0 3px 10px rgba(0,0,0,0.25)' : '0 6px 18px rgba(0,0,0,0.35)', // better visual separation
                        backdropFilter: 'blur(10px)',
                        transform: isActive ? 'scale(0.98)' : isHover ? 'translateY(-2px) scale(1.03)' : 'none',
                        filter: isHover ? 'brightness(1.15) saturate(1.1)' : 'none',
                        willChange: 'transform, filter',
                        transition: 'transform 0.05s ease-out, filter 0.3s ease'
                    }}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};
// ... existing code ...

export default LandingPage;
// ... existing code ...