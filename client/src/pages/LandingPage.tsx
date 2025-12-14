import { useState, useEffect } from 'react';
import FluidBackground from '../components/FluidBackground/FluidBackground';
import './LandingPage.css';

interface LandingPageProps {
    onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="landing-container">
            <FluidBackground />

            <div className={`landing-card ${isVisible ? 'visible' : 'hidden'}`}>
                <div className="icon-container">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                    </svg>
                </div>

                <h1 className="landing-title">
                    Find Your Peace
                </h1>

                <p className="landing-description">
                    A gentle space designed for your wellbeing. Take a moment to breathe, reflect, and begin your journey toward clarity.
                </p>

                <div className="button-group" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        className="cta-button"
                        onClick={() => onNavigate('login')}
                    >
                        Begin Your Journey
                    </button>
                </div>


                <p className="quote">
                    "In the midst of movement and chaos, keep stillness inside of you."
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
