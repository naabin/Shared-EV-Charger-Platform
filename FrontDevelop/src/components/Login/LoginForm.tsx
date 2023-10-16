import React, {useContext, useState} from 'react';
import { login } from '../../services/auth';
import { AuthContext } from '../../services/AuthContext';
import { Link, useNavigate } from 'react-router-dom';  // Added useNavigate here
import { Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import '../../styles/LoginReg.css';

const LoginForm: React.FC = () => {
    const navigate = useNavigate();  // Initialize the hook here inside the component
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { setAuthData } = useContext(AuthContext);

    interface FormElements extends HTMLFormElement {
        email: { value: string };
        password: { value: string };
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            email: { value: string };
            password: { value: string };
        };

        const email = target.email.value;
        const enteredPassword = target.password.value;
        const response = await login(email, enteredPassword);
        console.log(response);
        if (response.status === 200) {
            const access_token = response.data.access;
            const refresh_token = response.data.refresh;
            const user_id = response.data.id;
            const email = response.data.email;
            const username = response.data.username;
            const firstname = response.data.first_name;
            const lastname = response.data.last_name;
            const Uaddress = response.data.address;
            if (setAuthData) {
                setAuthData({
                    username: username,
                    id: user_id,
                    access_token: access_token,
                    refresh_token: refresh_token,
                    first_name : firstname,
                    last_name : lastname,
                    email : email ,
                    address : Uaddress,
                });
            }


            navigate('/mapPage'); // Use navigate here instead of window.location.href
        } else {
            console.error(response.error || "Login failed.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email address:</label>
                <input type="email" id="email" name="username" required />
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
