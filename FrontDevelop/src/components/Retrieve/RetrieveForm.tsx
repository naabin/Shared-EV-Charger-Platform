import React, { useState, useEffect } from "react";
import { register } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import "../../styles/LoginReg.css";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import background from "../../matirial/Image/retrieve.jpg";
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

const RetrieveForm: React.FC = () => {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      email: { value: string };
      
    };
    const email = target.email.value;


  };

  const areAllFieldsValid = () => {
    return (
    //   username &&
      email &&
      !showEmailError
    );
  };

  const defaultTheme = createTheme();
  const [showGrid, setShowGrid] = useState(true);
  return (
    <ThemeProvider theme={defaultTheme} >
      <Grid container component="main" sx={{ height: "100vh" }} >
        <CssBaseline />
        {showGrid && (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
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
            <Typography component="h1" variant="h5"style={{textAlign:'center'}}>
            Complete information to recover your password
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
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {showEmailError && <p className="error">{emailError}</p>}
              

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!areAllFieldsValid()}
                onClick={() => {setShowGrid(!showGrid);
                                setTimeout(() => {
                                    navigate("/login"); // 跳转到你想要的页面
                                }, 3000); 
                                // add send email function here
                }}
              >
                Send
              </Button>
              <Grid
                container
                sx={{
                  justifyContent: "center",
                }}
              >
                <Grid item>
                  <Link href="/login" variant="body1">
                  Remember your password?Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>)}
        {!showGrid && (
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
                <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height:"40%"
            }}
          >
            <Typography component="h1" variant="h5"style={{textAlign:'center'}}>
            After a few minutes
            </Typography>
            <Typography component="h1" variant="h5"style={{textAlign:'center'}}>
            you will receive a new password in your email
            </Typography>
            
          </Box>
                </Grid>
        )}
        
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

export default RetrieveForm;
