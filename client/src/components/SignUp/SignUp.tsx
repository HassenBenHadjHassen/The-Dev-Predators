import React, { useState } from 'react';
import FluidBackground from '../FluidBackground/FluidBackground';
import './SignUp.css';

interface SignUpProps {
    onSwitchToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle signup logic here
        console.log('SignUp attempt:', { username, email, password });
    };

    return (
        <div className="signup-container">
            <FluidBackground />

            <div className="signup-card">
                <h1 className="signup-title">Create Account</h1>
                <p className="signup-subtitle">
                    Join our community. <br />
                    Begin your journey to clarity today.
                </p>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username" className="input-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="signup-input"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email" className="input-label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="signup-input"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password" className="input-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="signup-input"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="signup-button">
                        Sign Up
                    </button>
                </form>

                <div className="signup-footer">
                    <span>Already have an account?</span>
                    <a onClick={onSwitchToLogin} className="footer-link">Log in</a>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
