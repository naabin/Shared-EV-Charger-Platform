import React, { useState, useEffect } from "react";
import { register } from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import "../../styles/LoginReg.css";
import backimg from "../../matirial/Image/reg.jpg";

const RegisterForm: React.FC = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/get_user_by_username/", {
        params: { username },
      })
      .then(() => {
        setShowUsernameError(false);
      })
      .catch((err) => {
        if (err.response) {
          setUsernameError(err.response.data.message);
          setShowUsernameError(true);
        }
      });
  }, [username]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/get_user_by_email/", {
        params: { email },
      })
      .then(() => setShowEmailError(false))
      .catch((err) => {
        if (err.response) {
          setEmailError(err.response.data.message);
          setShowEmailError(true);
        }
      });
  }, [email, showEmailError]);

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
        role: "user",
      },
      address: {
        street_address: address,
        lat: -33.865143,
        lng: 151.2099,
        suburb: suburb,
        post_code: postcode,
        country: city, // Assuming city here is meant as country
      },
    };
    if (!showEmailError && !showUsernameError) {
      register(userData)
        .then((data) => {
          setSubmitError("");
          navigate("/login");
        })
        .catch(() => {
          setSubmitError("Something went wrong. Please try again");
        });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container">
    <div className="driving-text-container">
      <img src={backimg} alt="?" className="driving-animation"></img>
      <h3 className="driving-text">New User Register:</h3>
    </div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="lastname">Last Name:</label>


      <Input
        placeholder="Please type your last name..."
        id="lastname"
        name="lastname"
        required
      />


      <label htmlFor="firstname">First Name:</label>
      <Input
        placeholder="Please type your first name..."
        id="firstname"
        name="firstname"
        required
      />
      <label htmlFor="email">Email:</label>
      <Input
        placeholder="Please type your email..."
        id="email"
        name="email"
        required
      />
      <label htmlFor="username">Username:</label>
      <Input
        placeholder="Please type your user name..."
        id="username"
        name="username"
        required
      />
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
              {visible ? (
                <EyeTwoTone style={{ fontSize: "6px" }} />
              ) : (
                <EyeInvisibleOutlined style={{ fontSize: "6px" }} />
              )}
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
            <span
              className="eye-icon"
              onClick={toggleConfirmPasswordVisibility}
            >
              {visible ? (
                <EyeTwoTone style={{ fontSize: "6px" }} />
              ) : (
                <EyeInvisibleOutlined style={{ fontSize: "6px" }} />
              )}
            </span>
          )}
        />
      </div>
      <label htmlFor="city">City:</label>
      <Input
        placeholder="Please type city..."
        id="city"
        name="city"
        required
      />
      <label htmlFor="suburb">Suburb:</label>
      <Input
        placeholder="Please type suburb..."
        id="suburb"
        name="suburb"
        required
      />
      <label htmlFor="postcode">Postcode:</label>
      <Input
        placeholder="Please type postcode..."
        id="postcode"
        name="postcode"
        required
      />
      <label htmlFor="address">Address:</label>
      <Input
        placeholder="Please type address..."
        id="postcode"
        name="postcode"
        required
      />
      <input type="submit" value="Register" />
    </form>


    <div className="login-link">
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  </div>
);
};

export default RegisterForm;
