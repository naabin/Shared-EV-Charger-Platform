import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { deepOrange } from "@mui/material/colors";
import {useState, useEffect, useContext} from "react";
import MyCharger from "../MapPage/MyCharger";
import Joyride, { STATUS } from "react-joyride";
import { AuthContext } from '../../services/AuthContext';


export default function ButtonAppBar({
                                         transactionpage,
                                         adminpage,
                                         myChargers,
                                         showLiveChat,
                                         toggleLiveChat
                                     }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [run, setRun] = useState(true);
    let { username, id, access_token, refresh_token } = useContext(AuthContext);
    const firstLetter = username ? username.charAt(0).toUpperCase() : 'A';
    console.log(username)
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
                    sx={{ backgroundColor: "#e0e0e0", zIndex: 1350 }}
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
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2, color: "black" }}
                            onClick={() =>
                                drawerOpen === true ? setDrawerOpen(false) : setDrawerOpen(true)
                            }
                        >
                            <MenuIcon />
                        </IconButton>
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
                            onClick={() =>
                                drawerOpen === true ? setDrawerOpen(false) : setDrawerOpen(true)
                            }
                        >
                            {firstLetter} {/* Replaced 'A' with the firstLetter */}
                        </Avatar>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <div style={{ width: 400, marginTop: 100 }}>
                    <Avatar
                        sx={{
                            bgcolor: deepOrange[300],
                            margin: "0 auto",
                            marginBottom: 2,
                        }}
                    >
                        {firstLetter} {/* Replaced 'A' with the firstLetter */}
                    </Avatar>
                    <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        style={{ marginBottom: 16 }}
                    >
                        {username || 'User Name'} {/* Replaced 'User Name' with the actual username, and fallback to 'User Name' if username is not defined */}
                    </Typography>


                    <List>
                        <ListItem disablePadding>
                            <Button
                                fullWidth
                                variant="outlined"
                                style={{ marginBottom: 30 }}
                                onClick={transactionpage}
                            >
                                Transaction History
                            </Button>
                        </ListItem>

                        <ListItem disablePadding>
                            <Button
                                fullWidth
                                variant="outlined"
                                style={{ marginBottom: 30 }}
                                onClick={toggleLiveChat}  // Toggle the live chat overlay
                            >
                                Live Chat
                            </Button>
                        </ListItem>

                        <ListItem disablePadding>
                            <Button
                                fullWidth
                                variant="outlined"
                                style={{ marginBottom: 30 }}
                                onClick={myChargers}
                            >
                                My Charger
                            </Button>
                        </ListItem>

                        <ListItem disablePadding>
                            <Button
                                fullWidth
                                variant="outlined"
                                style={{ marginBottom: 30 }}
                                onClick={adminpage}
                            >
                                Switch to Admin
                            </Button>
                        </ListItem>
                    </List>
                    <Divider style={{ margin: "16px 0" }} />
                    <Button fullWidth variant="contained" color="secondary">
                        Profile
                    </Button>
                </div>

            </Drawer>
        </>
    );
}

