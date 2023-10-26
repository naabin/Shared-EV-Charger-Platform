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

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [suburb, setSuburb] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");

  const [passwordLengthError, setPasswordLengthError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");


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

  useEffect(() => {
    if (password.length > 0 && password.length < 6) {
      setPasswordLengthError("Password should be at least 6 characters long!");
    } else {
      setPasswordLengthError("");
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword.length > 0 && password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match!");
    } else {
      setPasswordMatchError("");
    }
  }, [password, confirmPassword]);

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



  const areAllFieldsValid = () => {
    return (
        username &&
        email &&
        password &&
        confirmPassword &&
        firstname &&
        lastname &&
        city &&
        suburb &&
        postcode &&
        address &&
        !passwordLengthError &&
        !passwordMatchError &&
        !showUsernameError &&
        !showEmailError
    );
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
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
      />

      <label htmlFor="firstname">First Name:</label>
      <Input
          placeholder="Please type your first name..."
          id="firstname"
          name="firstname"
          required
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
      />

      <label htmlFor="email">Email:</label>
      <Input
          placeholder="Please type your email..."
          id="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
      />
      {showEmailError && <p className="error">{emailError}</p>}

      <label htmlFor="username">Username:</label>
      <Input
          placeholder="Please type your user name..."
          id="username"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
      />
      {showUsernameError && <p className="error">{usernameError}</p>}

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
        {passwordLengthError && <p className="error">{passwordLengthError}</p>}

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
        {passwordMatchError && <p className="error">{passwordMatchError}</p>}
      </div>
      <label htmlFor="city">City:</label>
      <Input
          placeholder="Please type city..."
          id="city"
          name="city"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
      />
      <label htmlFor="suburb">Suburb:</label>
      <Input
          placeholder="Please type suburb..."
          id="suburb"
          name="suburb"
          required
          value={suburb}
          onChange={(e) => setSuburb(e.target.value)}
      />
      <label htmlFor="postcode">Postcode:</label>
      <Input
          placeholder="Please type postcode..."
          id="postcode"
          name="postcode"
          required
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
      />
      <label htmlFor="address">Address:</label>
      <Input
          placeholder="Please type address..."
          id="address"
          name="address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
      />

      <input
          type="submit"
          value="Register"
          className="register-button"
          disabled={!areAllFieldsValid()}
      />



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
