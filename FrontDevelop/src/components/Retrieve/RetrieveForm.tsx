import React from 'react';
import { FormEvent } from 'react';
import '../../styles/LoginReg.css';
import { register } from '../../services/auth';
import {Link} from "react-router-dom";

const RetrieveForm: React.FC = () => {
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

        // Check password confirmation
        if (enteredPassword !== enteredConfirmPassword) {
            console.error("Passwords do not match!");
            return;
        }

        // Prepare user data based on the structure you provided
        const userData = {
            username: username,
            email: email,
            first_name: firstname,
            last_name: lastname,
            password: enteredPassword,
            role: {
                role: "string"  // Adjust this as necessary. Currently hardcoded to 'string'
            },
            address: {
                street_address: address,
                lat: "string",  // You might need to adjust this
                lng: "string",  // You might need to adjust this
                suburb: suburb,
                post_code: postcode,
                country: city  // Assuming city here is meant as country
            }
        };

        register(userData).then((data) => {
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