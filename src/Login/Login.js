import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();



  
        // Replace these with your preset email and password for login
        const presetEmail = 'admin@office.com';
        const presetPassword = 'admin';

        // Check if the entered email and password match the preset values
        if (email === presetEmail && password === presetPassword) {
            // Perform successful login action here (e.g., store authentication token)
            // For demonstration purposes, let's just navigate to '/Admin' after successful login.
            navigate('/Admin');
        } else {
            alert('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className='main'>
            <div className="container">
                <img src="/Mediplus_Logo.jpg" alt="Hospital Image" className="login-logo" />
                <h2 className="login-heading">Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <label className="label">Email:</label>
                    <input
                        type="email"
                        placeholder="Abc@example.com"
                        className="input-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="label">Password:</label>
                    <input
                        type="password"
                        placeholder="Type password here"
                        className="input-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className="btn-submit">Submit</button>

                    <p className="forgot-password">Forgot password</p>
                </form>
            </div>
        </div>
    );
}

export default Login;
