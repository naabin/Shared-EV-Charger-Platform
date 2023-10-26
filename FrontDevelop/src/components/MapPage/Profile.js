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
  const [isEditing, setIsEditing] = useState(false);
  const [originalUserData, setOriginalUserData] = useState(null);

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
          .then((res) => {
            setOriginalUserData(res.data);
            setUserData(res.data);
          })
          .catch((err) => console.log(err));
    }
  }, [auth]);

  const handleFieldChange = (fieldName, value) => {
    if (fieldName.startsWith("address.")) {
      const addressField = fieldName.substring("address.".length);
      setUserData({
        ...userData,
        address: {
          ...userData.address,
          [addressField]: value,
        },
      });
    } else {
      setUserData({
        ...userData,
        [fieldName]: value,
      });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    let data = null;

    data = {
      username: userData.username,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      password: "123456",
      role: {
        role: userData.role.role,
      },
      address: {
        street_address: userData.address.street_address,
        lat: userData.address.lat,
        lng: userData.address.lng,
        suburb: userData.address.suburb,
        post_code: userData.address.post_code,
        country: userData.address.country,
      },
    };

    if (auth && auth.id) {
      try {
        const response = await axios.put(`http://localhost:8000/user/${auth.id}/`, JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.access,
          },
        });

        setOriginalUserData(response.data);
        console.log("User data updated:", response.data);
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
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
                              secondary={userData.last_name}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                              primary="First Name"
                              secondary={userData.first_name}
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
                              secondary={userData.email}
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
                              primary="Country"
                              secondary={
                                isEditing ? (
                                    <Input
                                        value={userData.address.country}
                                        onChange={(e) =>
                                            handleFieldChange("address.country", e.target.value)
                                        }
                                        style={{ padding: "1px", height: "45px" }}
                                    />
                                ) : (
                                    userData.address.country
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
                                            handleFieldChange("address.suburb", e.target.value)
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
                                            handleFieldChange("address.post_code", e.target.value)
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
                                            handleFieldChange("address.street_address", e.target.value)
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
