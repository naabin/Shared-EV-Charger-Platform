import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Joyride, { STATUS } from "react-joyride";
import { AuthContext } from "../../services/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Input from '@mui/material/Input';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import InboxIcon from '@mui/icons-material/Inbox';
import { PoweroffOutlined } from '@ant-design/icons';import axios from "axios";
import transactionImg from '../../matirial/Image/transaction.png';
import wechatImg from '../../matirial/Image/wechat.png';
import chargerIconImg from '../../matirial/Image/chargerIcon.png';

export default function ButtonAppBar({
  transactionpage,
  adminpage,
  myChargers,
  showLiveChat,
  toggleLiveChat,
  profile,
}) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [run, setRun] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [auth, setAuth] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [userData, setUserData] = useState(null);
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };


  useEffect(() => {
    if (localStorage.getItem("user")) {
      setAuth(JSON.parse(localStorage.getItem("user")));

      if (auth && auth.access) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  useEffect(() => {
    if (auth && auth.id) {
      axios
          .get(`http://localhost:8000/user/${auth.id}/`, {
            headers: {
              Authorization: `Bearer ` + auth.access,
            },
          })
          .then((res) => setUserData(res.data))
          .catch((err) => console.log(err));
    }
  }, [auth]);
  const firstLetter = (auth && auth.username) ? auth.username.charAt(0).toUpperCase() : "A";

  const steps = [
    {
      target: ".first-step",
      content: "Clicking Avatar for more functions",
      position: "left",
    },
    {
      target: ".btn-dark-mode",
      content: "You can switch to Dark Mode if needed",
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
    }
  };

  const logout = () => {
    localStorage.setItem("user", null);
    navigate("/login");
  };

  useEffect(
    function () {
      document.documentElement.classList.toggle("dark-mode");
    },
    [isDark]
  );
  return (
    <>
      <Box sx={{ flexGrow: 1, zIndex: 1250 }}>
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "#F3F3F3", zIndex: 1350 }}
        >
          <Toolbar>
            <Joyride
              continuous={true}
              run={run}
              showProgress={true}
              showSkipButton={true}
              hideCloseButton={true}
              steps={steps}
              styles={{
                tooltip: {
                  transform: "translate(-100px, 30px)",
                  width: "300px",
                },
                beacon: {
                  transform: "translate(0px, 30px)",
                },
              }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "black" }}
            >
              EV Shared Charger
            </Typography>
            <button
              onClick={() => setIsDark((isDark) => !isDark)}
              className="btn-dark-mode"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? "🌙" : "☀️"}
            </button>
            <Avatar
              className="first-step"
              sx={{ bgcolor: deepOrange[300], cursor: "pointer" }}
              // onClick={() =>
              //   drawerOpen === true ? setDrawerOpen(false) : setDrawerOpen(true)
              // }
              onClick={handleClick('bottom-end')}
            >
              {firstLetter} {/* Replaced 'A' with the firstLetter */}
            </Avatar>
          </Toolbar>
        </AppBar>
        <Popper  style={{ zIndex: 1400 }} open={open} anchorEl={anchorEl} placement={placement} transition>
          {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper style={{width:300}}>
                  {/* <div style={{ width: 300, height:500}}><br></br> */}
                  <Card sx={{ marginTop:1, Width: 100, height:400, backgroundColor:'#E2E2E2'}}>
                    <CardContent>
                      <Card sx={{ Width: 280, height:80}}>
                        <CardContent>
                          <Box sx={{display:"inline-block", width:20}}>
                            <SvgIcon onClick={() => navigate("/ProfilePage")} cursor='pointer'sx={{marginLeft:'220px',display:"inline-block"}}>
                              {/* credit: plus icon from https://heroicons.com/ */}
                              <svg

                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                              >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                                />
                              </svg>
                            </SvgIcon>
                            <Avatar
                                className="first-step"
                                sx={{ marginTop:"-25px", bgcolor: deepOrange[300]}}
                            >
              {firstLetter} {/* Replaced 'A' with the firstLetter */}
                            </Avatar>
                          </Box>
                          <Box sx={{ marginTop:-7,marginLeft:9, width: '60%'}}>

                            <p style={{fontWeight:"400", fontSize:'20px'}}>{auth && auth.username ? auth.username : "User Name"}</p>
                            <p style={{marginTop:"-15px",fontSize:"10px"}}>{userData && userData.email ? userData.email : "email"}</p>
                          </Box>
                        </CardContent>

                      </Card>
                      <Card sx={{ Width: 280, height:280, marginTop:'5px'}}>
                        <CardContent>
                        <List subheader={
                            <ListSubheader style={{backgroundColor:'#EDF2FF',marginLeft:'-15px',marginTop:'-10px',height:'40px'}}component="div" id="nested-list-subheader">
                              Options
                            </ListSubheader>
                          }><hr></hr>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <img src={transactionImg} alt="Transaction Icon" />
                                </ListItemIcon>
                                <ListItemText primary="Transaction" onClick={transactionpage} />
                              </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <img src={wechatImg} alt="WeChat Icon" />
                                </ListItemIcon>
                                <ListItemText primary="LiveChat" onClick={toggleLiveChat} />
                              </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <img src={chargerIconImg} alt="Charger Icon" />
                                </ListItemIcon>
                                <ListItemText primary="MyCharger" onClick={() => window.location.href = "/myCharger"}/>
                              </ListItemButton>
                            </ListItem>
                            <Button style={{marginTop:"15px"}} type="primary" variant="outlined" shape="round" icon={<PoweroffOutlined />} size={'large'} onClick={logout}>
                            Log out
                          </Button>
                          </List>

                        </CardContent>

                      </Card>
                      <CardContent>
                      </CardContent>
                    </CardContent>
                  </Card>
                </Paper>
              </Fade>
          )}
        </Popper>
      </Box>
    </>
  );
}
