import { useState, useEffect } from 'react';
import FluidBackground from '../components/FluidBackground/FluidBackground';

interface LandingPageProps {
    onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #f5f9fa 0%, #e8f4f8 100%)'
        }}>
            <FluidBackground />
            <div style={{ zIndex: 1, textAlign: 'center' }}>
                <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Welcome to the Future</h1>
                <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Experience the fluid motion.</p>
                <button style={{
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
                }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                    </svg>
                </div>

                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    marginBottom: '1rem',
                    color: '#2c5f6f',
                    fontWeight: '600',
                    letterSpacing: '-0.03em',
                    lineHeight: '1.15'
                }}>
                    Find Your Peace
                </h1>

                <p style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                    marginBottom: '2.5rem',
                    color: '#5a7c84',
                    lineHeight: '1.7',
                    fontWeight: '400',
                    maxWidth: '500px',
                    margin: '0 auto 2.5rem'
                }}>
                    A gentle space designed for your wellbeing. Take a moment to breathe, reflect, and begin your journey toward clarity.
                </p>

                <button
                    onClick={() => onNavigate('login')}
                    style={{
                        padding: '1.1rem 3rem',
                        fontSize: '1.1rem',
                        background: 'linear-gradient(135deg, #93b7be 0%, #7c9a92 100%)',
                        border: 'none',
                        color: 'white',
                        borderRadius: '60px',
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: '0 8px 24px rgba(124, 154, 146, 0.25)',
                        fontWeight: '500',
                        letterSpacing: '0.01em'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(124, 154, 146, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(124, 154, 146, 0.25)';
                    }}
                >
                    Begin Your Journey
                </button>

                <p style={{
                    marginTop: '2rem',
                    fontSize: '0.9rem',
                    color: '#7a9ca3',
                    fontStyle: 'italic'
                }}>
                    "In the midst of movement and chaos, keep stillness inside of you."
                </p>
            </div>

            <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.05); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default LandingPage;
