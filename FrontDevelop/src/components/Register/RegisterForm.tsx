import React, { useState } from 'react';
import { register } from '../../services/auth';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import '../../styles/LoginReg.css';

const RegisterForm: React.FC = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            username: { value: string };
            password: { value: string };
            confirmPassword: { value: string };
        };
        const username = target.username.value;
        const enteredPassword = target.password.value;
        const enteredConfirmPassword = target.confirmPassword.value;

        register(username, enteredPassword).then((data) => {
            // Handle the response data
            console.log(data);
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
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
                            <span className="eye-icon" onClick={togglePasswordVisibility}>
                                {visible ? <EyeTwoTone style={{ fontSize: '6px' }} /> : <EyeInvisibleOutlined style={{ fontSize: '6px' }} />}
                            </span>
                        )}
                    />
                </div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <div className="password-input">
                    <Input.Password
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        iconRender={(visible) => (
                            <span className="eye-icon" onClick={toggleConfirmPasswordVisibility}>
                                {visible ? <EyeTwoTone style={{ fontSize: '6px' }} /> : <EyeInvisibleOutlined style={{ fontSize: '6px' }} />}
                            </span>
                        )}
                    />
                </div>
                <input type="submit" value="Register" />
            </form>

            <div className="login-link">
                <p>Already have an account?  <Link to="/login">Login here</Link></p>
            </div>
        </div>
    );
};

export default RegisterForm;
