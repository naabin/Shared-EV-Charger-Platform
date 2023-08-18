import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/path_to_your_login_endpoint/', {
                username: username,
                password: password
            });

            if (response.data.success) {  // Adjust based on the response shape from Django
                setMessage('Login successful!');
            } else {
                setMessage('Invalid username or password.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
            {message && <div>{message}</div>}
        </div>
    );
}

export default Login;

