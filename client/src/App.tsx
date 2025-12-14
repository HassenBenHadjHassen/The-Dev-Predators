import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import './App.css';

function App() {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleNavigate = (page: string) => {
    if (page === 'login') {
      const loginSection = document.getElementById('login-section');
      if (loginSection) {
        loginSection.scrollIntoView({ behavior: 'smooth' });
      }
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

export default App
