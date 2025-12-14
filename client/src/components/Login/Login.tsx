import React, { useState } from 'react';
import FluidBackground from '../FluidBackground/FluidBackground';
import './Login.css';

interface LoginProps {
    onSwitchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToSignup }) => {
    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt:', { username });
    };

    return (
        <section className="login-container">


            <div className="login-card">
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">
                    Take a deep breath. <br />
                    Log in to continue your journey.
                </p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username" className="input-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="login-input"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>



                    <div className="input-group">
                        <label htmlFor="password" className="input-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="login-input"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Sign In
                    </button>
                </form>

                <div className="login-footer">
                    <span>Don't have an account?</span>
                    <a onClick={onSwitchToSignup} className="footer-link" style={{ cursor: 'pointer' }}>Sign up gently</a>
                </div>
            </div>
        </section>
    );
};

export default Login;
