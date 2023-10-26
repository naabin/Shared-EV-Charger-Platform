import React, { useContext, useState } from "react";
import { login } from "../../services/auth";
import { AuthContext } from "../../services/AuthContext";
import { json, useNavigate } from "react-router-dom"; // Added useNavigate here
//import { Input, Button } from "antd";
//import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import background from "../../matirial/Image/login.jpg"
import {Grid, createTheme, ThemeProvider, CssBaseline, Box, Avatar,Button, Checkbox, Paper, Typography, TextField,FormControlLabel, Link} from "@mui/material"
import {  notification } from 'antd';

const LoginForm: React.FC = () => {
  const navigate = useNavigate(); // Initialize the hook here inside the component
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthData } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [showError, setShowError] = useState(false);
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
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data));
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
          first_name: firstname,
          last_name: lastname,
          email: email,
          address: Uaddress,
        });
      }
      setShowError(false);
      navigate("/mapPage"); // Use navigate here instead of window.location.href
    } else {
      notification.open({
        message: 'Wrong account password combination',
        style: {
          backgroundColor: '#ff7171',
          fontSize: '5px'
        }
      });
      setLoginError(response.error);
      setShowError(true);
    }
  };

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  const defaultTheme = createTheme();

  return (

    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
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
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/retrieve" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    // <div className="container">
    //   <h2>Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="email">Email address:</label>
    //     <input
    //       style={{ borderColor: showError ? "red" : "" }}
    //       onChange={() => setShowError(false)}
    //       type="email"
    //       id="email"
    //       name="username"
    //       required
    //     />
    //     <label htmlFor="password">Password:</label>
    //     <div className="password-input">
    //       <Input.Password
    //         style={{ borderColor: showError ? "red" : "" }}
    //         placeholder="Password"
    //         id="password"
    //         name="password"
    //         required
    //         value={password}
    //         onChange={(e) => {
    //           setShowError(false);
    //           setPassword(e.target.value);
    //         }}
    //         iconRender={(visible) => (
    //           <span className="eye-icon">
    //             {visible ? (
    //               <EyeTwoTone style={{ fontSize: "6px" }} />
    //             ) : (
    //               <EyeInvisibleOutlined style={{ fontSize: "6px" }} />
    //             )}
    //           </span>
    //         )}
    //       />
    //     </div>
    //     <p className="username-error">{showError && loginError}</p>
    //     <input type="submit" value="Login" />
    //   </form>
    //   <div className="register-link">
    //     <p>
    //       Don't have an account? <Link to="/register">Register here</Link>
    //     </p>
    //   </div>
    //   <div className="retrieve-link">
    //     <p>
    //       Forgot password? <Link to="/retrieve">Retrieve password</Link>
    //     </p>
    //   </div>
    // </div>

  );
};

export default LoginForm;
