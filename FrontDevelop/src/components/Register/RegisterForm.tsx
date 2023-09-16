import React from 'react';
import { FormEvent } from 'react';
import '../../styles/LoginReg.css';
import { register } from '../../services/auth';

const RegisterForm: React.FC = () => {
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            username: { value: string };
            password: { value: string };
        };
        const username = target.username.value;
        const password = target.password.value;

        register(username, password).then((data) => {
            // Handle the response data
            console.log(data);
        });
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default RegisterForm;
