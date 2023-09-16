import React from 'react';
import { FormEvent } from 'react';
import '../../styles/LoginReg.css';
import { login } from '../../services/auth';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            username: { value: string };
            password: { value: string };
        };
        const username = target.username.value;
        const password = target.password.value;

        const data = await login(username, password);

        if (data.message === 'Login successful')
        {
            window.location.href = '/mapPage';
        } else {
            // Show error message
            console.log("fail")
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <input type="submit" value="Login" />
            </form>
            <div className="register-link">
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </div>
    );
};

export default LoginForm;
