import { useState } from 'react';
import LandingPage from './LandingPage';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import '../App.css';

import { useNavigate } from 'react-router-dom';

function Home() {
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const navigate = useNavigate();

    const handleNavigate = (page: string) => {
        if (page === 'login') {
            const loginSection = document.getElementById('login-section');
            if (loginSection) {
                loginSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (page === 'game') {
            navigate('/play');
        }
    };

    return (
        <>
            <LandingPage onNavigate={handleNavigate} />
            <div id="login-section">
                {authMode === 'login' ? (
                    <Login onSwitchToSignup={() => setAuthMode('signup')} />
                ) : (
                    <SignUp onSwitchToLogin={() => setAuthMode('login')} />
                )}
            </div>
        </>
    )
}

export default Home
