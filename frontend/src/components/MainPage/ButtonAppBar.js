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
import { useState } from "react";
import MyCharger from "./MyCharger";

export default function ButtonAppBar({
  transactionpage,
  adminpage,
  myChargers,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <Box sx={{ flexGrow: 1, zIndex: 1250 }}>
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "#e0e0e0", zIndex: 1350 }}
        >
          <Toolbar>
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
            <Avatar sx={{ bgcolor: deepOrange[300] }}>A</Avatar>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div style={{ width: 400, marginTop: 100 }}>
          <Avatar
            sx={{
              bgcolor: deepOrange[300],
              margin: "0 auto",
              marginBottom: 2,
            }}
          >
            A
          </Avatar>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            style={{ marginBottom: 16 }}
          >
            User Name
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
              <Button fullWidth variant="outlined" style={{ marginBottom: 30 }}>
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
