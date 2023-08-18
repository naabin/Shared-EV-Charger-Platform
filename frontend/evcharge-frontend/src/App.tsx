import React from 'react';
import Login from './Login';
import Register from './Register';
import './App.css'; // For styling
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
const BASE_URL = "http://127.0.0.1:8000/";

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}


export default App;