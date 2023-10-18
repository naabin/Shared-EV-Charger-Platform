import React, { useContext, useState, useEffect } from "react";
import { Button, Input } from "antd";
import {
  Typography,
  List,
  ListItem,
  Container,
  ListItemText,
  Divider,
  Paper,
  Grid,
} from "@mui/material";
import ButtonAppBar from "../utils/ButtonAppBar";
import "../../styles/CoverPage/app_header.css";
import { AuthContext } from "../../services/AuthContext";
import LiveChat from "./LiveChat";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setAuth(JSON.parse(localStorage.getItem("user")));
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

  const [isEditing, setIsEditing] = useState(false);
  const [editedUserProfile, setEditedUserProfile] = useState({
    lastName: userData && userData.last_name,
    firstName: userData && userData.first_name,
    email: userData && userData.email,
    username: userData && userData.username,
    city: userData && userData.address && userData.city,
    suburb: userData && userData.address && userData.suburb,
    postcode: userData && userData.address && userData.address.post_code,
    // address: address?.address || "",
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    // Add your save logic here
  };

  const handleFieldChange = (fieldName, value) => {
    setEditedUserProfile({ ...editedUserProfile, [fieldName]: value });
  };

  const containerStyle = {
    backgroundColor: "white",
    padding: "75px 1px 0 1px",
    borderRadius: "10px",
  };

  return (
      <div>
        <ButtonAppBar
            transactionpage={() => navigate("/TransactionPage")}
            adminpage={() => navigate("/Adminpage")}
            myChargers={() => navigate("/myCharger")}
            showLiveChat={showLiveChat}
            toggleLiveChat={() => setShowLiveChat(!showLiveChat)}
            profile={() => navigate("/ProfilePage")}
        />
        {showLiveChat && (
            <LiveChat onClose={() => setShowLiveChat(false)} show={showLiveChat} />
        )}

        {userData && (
            <Container style={containerStyle}>
              <div className="user-info">
                <Grid container spacing={2}>
                  <Grid
                      item
                      xs={12}
                      style={{ paddingLeft: "30px", paddingRight: "30px" }}
                  >
                    <Typography
                        variant="h5"
                        style={{ paddingTop: "10px", paddingBottom: "10px" }}
                    >
                      Personal Information
                    </Typography>
                    <Paper>
                      <List>
                        <ListItem>
                          <ListItemText
                              primary="Last Name"
                              secondary={
                                isEditing ? (
                                    <Input
                                        value={userData.last_name}
                                        onChange={(e) =>
                                            handleFieldChange("lastName", e.target.value)
                                        }
                                        style={{ padding: "1px", height: "45px" }}
                                    />
                                ) : (
                                    userData.last_name
                                )
                              }
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                              primary="First Name"
                              secondary={
                                isEditing ? (
                                    <Input
                                        value={userData.first_name}
                                        onChange={(e) =>
                                            handleFieldChange("firstName", e.target.value)
                                        }
                                        style={{ padding: "1px", height: "45px" }}
                                    />
                                ) : (
                                    userData.first_name
                                )
                              }
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                              primary="Username"
                              secondary={
                                isEditing ? (
                                    <Input
                                        value={userData.username}
                                        onChange={(e) =>
                                            handleFieldChange("username", e.target.value)
                                        }
                                        style={{ padding: "1px", height: "45px" }}
                                    />
                                ) : (
                                    userData.username
                                )
                              }
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                  <Grid
                      item
                      xs={12}
                      style={{ paddingLeft: "30px", paddingRight: "30px" }}
                  >
                    <Typography
                        variant="h5"
                        style={{ paddingTop: "10px", paddingBottom: "10px" }}
                    >
                      Contact Information
                    </Typography>
                    <Paper>
                      <List>
                        <ListItem>
                          <ListItemText
                              primary="Email"
                              secondary={
                                isEditing ? (
                                    <Input
                                        value={userData.email}
                                        onChange={(e) =>
                                            handleFieldChange("email", e.target.value)
                                        }
                                        style={{ padding: "1px", height: "45px" }}
                                    />
                                ) : (
                                    userData.email
                                )
                              }
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                  <Grid
                      item
                      xs={12}
                      style={{ paddingLeft: "30px", paddingRight: "30px" }}
                  >
                    <Typography
                        variant="h5"
                        style={{ paddingTop: "10px", paddingBottom: "10px" }}
                    >
                      Address Information
                    </Typography>
                    <Paper>
                      <List>
                        <ListItem>
                          <ListItemText
                              primary="City"
                              secondary={
                                isEditing ? (
                                    <Input
                                        value={userData.city}
                                        onChange={(e) =>
                                            handleFieldChange("city", e.target.value)
                                        }
                                        style={{ padding: "1px", height: "45px" }}
                                    />
                                ) : (
                                    userData.address.city
                                )
                              }
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                              primary="Suburb"
                              secondary={
                                isEditing ? (
                                    <Input
                                        value={userData.address.suburb}
                                        onChange={(e) =>
                                            handleFieldChange("suburb", e.target.value)
                                        }
                                        style={{ padding: "1px", height: "45px" }}
                                    />
                                ) : (
                                    userData.address.suburb
                                )
                              }
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                              primary="Postcode"
                              secondary={
                                isEditing ? (
                                    <Input
                                        value={userData.address.post_code}
                                        onChange={(e) =>
                                            handleFieldChange("postcode", e.target.value)
                                        }
                                        style={{ padding: "1px", height: "45px" }}
                                    />
                                ) : (
                                    userData.address.post_code
                                )
                              }
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                              primary="Address"
                              secondary={
                                isEditing ? (
                                    <Input
                                        value={userData.address.street_address}
                                        onChange={(e) =>
                                            handleFieldChange("address", e.target.value)
                                        }
                                        style={{ padding: "1px", height: "45px" }}
                                    />
                                ) : (
                                    userData.address.street_address
                                )
                              }
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
              {isEditing ? (
                  <Button
                      type="primary"
                      onClick={handleSaveClick}
                      style={{
                        backgroundColor: "#add8e6", // light blue in hex
                        color: "white",
                        fontSize: "22px",
                        padding: "2px 5px",
                        margin: "25px 12px",
                        width: "60px",
                        height: "40px",
                      }}
                  >
                    Save
                  </Button>
              ) : (
                  <Button
                      type="primary"
                      onClick={handleEditClick}
                      style={{
                        backgroundColor: "#add8e6", // light blue in hex
                        color: "white",
                        fontSize: "22px",
                        padding: "2px 5px",
                        margin: "25px 12px",
                        width: "60px",
                        height: "40px",
                      }}
                  >
                    Edit
                  </Button>
              )}
            </Container>
        )}
      </div>
  );
};

export default ProfilePage;