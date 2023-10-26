import React, { useState, useEffect } from "react";
import { register } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import "../../styles/LoginReg.css";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import background from "../../matirial/Image/register.jpg";
import {
  Link,
  Grid,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Avatar,
  Button,
  Checkbox,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
} from "@mui/material";

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

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        {/* <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        /> */}
        {/* <div className="container"> */}
        {/* <div className="driving-text-container">
      
      <h3 className="driving-text">New User Register:</h3>
    </div> */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AppRegistrationOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              New User Register
            </Typography>
            {/* <form onSubmit={handleSubmit}> */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastname"
                autoComplete="lastname"
                autoFocus
              />
              {/* <label htmlFor="lastname">Last Name:</label>


      <Input
          placeholder="Please type your last name..."
          id="lastname"
          name="lastname"
          required
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
      /> */}

              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstname"
                autoComplete="firstname"
                autoFocus
              />

              {/* <label htmlFor="firstname">First Name:</label>
      <Input
          placeholder="Please type your first name..."
          id="firstname"
          name="firstname"
          required
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
      /> */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              {/* <label htmlFor="email">Email:</label>
      <Input
          placeholder="Please type your email..."
          id="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
      /> */}
              {showEmailError && <p className="error">{emailError}</p>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="user"
                autoFocus
              />

              {/* <label htmlFor="username">Username:</label>
      <Input
          placeholder="Please type your user name..."
          id="username"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
      /> */}
              {showUsernameError && <p className="error">{usernameError}</p>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                autoFocus
              />

              {/* <label htmlFor="password">Password:</label>
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
        /> */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                autoComplete="cpassword"
                autoFocus
              />
              {passwordLengthError && (
                <p className="error">{passwordLengthError}</p>
              )}

              {/* </div> */}

              {/* <label htmlFor="confirmPassword">Confirm Password:</label>
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
        /> */}
              {passwordMatchError && (
                <p className="error">{passwordMatchError}</p>
              )}
              {/* </div> */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
                autoFocus
              />
              {/* <label htmlFor="city">City:</label>
      <Input
          placeholder="Please type city..."
          id="city"
          name="city"
          required
          
          value={city}
          onChange={(e) => setCity(e.target.value)}
      /> */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="suburb"
                label="Suburb"
                name="suburb"
                autoComplete="suburb"
                autoFocus
              />
              {/* <label htmlFor="suburb">Suburb:</label>
      <Input
          placeholder="Please type suburb..."
          id="suburb"
          name="suburb"
          required
          value={suburb}
          onChange={(e) => setSuburb(e.target.value)}
      /> */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="postcode"
                label="Postcode"
                name="postcode"
                autoComplete="postcode"
                autoFocus
              />

              {/* <label htmlFor="postcode">Postcode:</label>
      <Input
          placeholder="Please type postcode..."
          id="postcode"
          name="postcode"
          required
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
      /> */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                autoFocus
              />

              {/* <label htmlFor="address">Address:</label>
      <Input
          placeholder="Please type address..."
          id="address"
          name="address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
      /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!areAllFieldsValid()}
              >
                Join Now!
              </Button>

              {/* <input
          type="submit"
          value="Register"
          className="register-button"
          disabled={!areAllFieldsValid()}
      /> */}

              {/* </form> */}
              <Grid container sx={{
                    justifyContent: "center",
                  }}>
                <Grid
                  item
      
                >
                  <Link href="/login" variant="body1">
                    Already Have An Account? Log In Here!
                  </Link>
                </Grid>
              </Grid>

              {/* <div className="login-link">
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div> */}
              {/* </div> */}
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
};

export default RegisterForm;
