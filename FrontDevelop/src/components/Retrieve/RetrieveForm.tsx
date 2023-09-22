import React from 'react';
import { FormEvent } from 'react';
import '../../styles/LoginReg.css';
import { register } from '../../services/auth';
import {Link} from "react-router-dom";

const RetrieveForm: React.FC = () => {
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
            <h2>Retrieve</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Email address:</label>
                <input type="text" id="username" name="username" required />
                <input type="submit" value="Retrieve" />
            </form>

            <div className="login-link">
                <p>Remembered your password?  <Link to="/login">Login here</Link></p>
            </div>
        </div>
    );
};

export default RetrieveForm;