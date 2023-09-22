import React, { useState } from 'react';
import { login } from '../../services/auth';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import '../../styles/LoginReg.css';

const LoginForm: React.FC = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            username: { value: string };
            password: { value: string };
        };
        const username = target.username.value;
        const enteredPassword = target.password.value;

        const data = await login(username, enteredPassword);

        if (data.message === 'Login successful') {
            window.location.href = '/mapPage';
        } else {
            // Show error message
            console.log("fail");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Email address:</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="password">Password:</label>
                <div className="password-input">
                    <Input.Password
                        placeholder="Password"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        iconRender={(visible) => (
                            <span className="eye-icon">
                                {visible ? <EyeTwoTone style={{ fontSize: '6px' }} /> : <EyeInvisibleOutlined style={{ fontSize: '6px' }} />}
                            </span>
                        )}
                    />
                </div>
                <input type="submit" value="Login" />
            </form>
            <div className="register-link">
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
            <div className="retrieve-link">
                <p>Forgot password? <Link to="/retrieve">Retrieve password</Link></p>
            </div>
        </div>
    );
};

export default LoginForm;
