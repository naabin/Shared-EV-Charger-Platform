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
            lastname: { value: string };
            firstname: { value: string };
            email: { value: string };
            username: { value: string };
            password: { value: string };
            confirmPassword: { value: string };
            city: { value: string };
            suburb: { value: string };
            postcode: { value: string };
            address: { value: string };
        };
        const lastname = target.lastname.value;
        const firstname = target.firstname.value;
        const email = target.email.value;
        const username = target.username.value;
        const enteredPassword = target.password.value;
        const enteredConfirmPassword = target.confirmPassword.value;
        const city = target.city.value;
        const suburb = target.suburb.value;
        const postcode = target.postcode.value;
        const address = target.address.value;

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
                <label htmlFor="lastname">Last Name:</label>
                <input type="text" id="lastname" name="lastname" required />
                <label htmlFor="firstname">First Name:</label>
                <input type="text" id="firstname" name="firstname" required />
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" required pattern="[^@\s]+@[^@\s]+" />
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
                <label htmlFor="city">City:</label>
                <input type="text" id="city" name="city" required />
                <label htmlFor="suburb">Suburb:</label>
                <input type="text" id="suburb" name="suburb" required />
                <label htmlFor="postcode">Postcode:</label>
                <input type="text" id="postcode" name="postcode" required />
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" required />
                <input type="submit" value="Register" />
            </form>

            <div className="login-link">
                <p>Already have an account?  <Link to="/login">Login here</Link></p >
            </div>
        </div>
    );
};

export default RegisterForm;