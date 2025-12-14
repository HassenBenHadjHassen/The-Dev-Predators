import React, { useState } from 'react';
import FluidBackground from '../FluidBackground/FluidBackground';
import './Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt:', { username, email });
    };

    return (
        <div className="login-container">
            <FluidBackground />


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
                        <label htmlFor="email" className="input-label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="login-input"
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
                    <a href="#" className="footer-link">Sign up gently</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
