import React, { useContext, useState } from "react";
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
import { AuthContext } from '../../services/AuthContext';
import LiveChat from "./LiveChat";
import {useNavigate} from "react-router-dom";


const ProfilePage = () => {
    const navigate = useNavigate();
    const [showLiveChat, setShowLiveChat] = useState(false);
    const auth = useContext(AuthContext);
    console.log(auth);
    let { username, id, access_token, refresh_token, first_name, last_name, email, address } = useContext(AuthContext);
    console.log(username,id,first_name);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserProfile, setEditedUserProfile] = useState({
        lastName: last_name || "",
        firstName: first_name || "",
        email: email || "",
        username: username || "",
        city: address?.city || "",
        suburb: address?.suburb || "",
        postcode: address?.postcode || "",
        address: address?.address || "",
    });
    console.log()
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
                transactionpage={() => navigate('/TransactionPage')}
                adminpage={() => navigate('/Adminpage')}
                myChargers={() => navigate('/myCharger')}
                showLiveChat={showLiveChat}
                toggleLiveChat={() => setShowLiveChat(!showLiveChat)}
                profile={() => navigate('/ProfilePage')}
            />
            {showLiveChat && <LiveChat onClose={() => setShowLiveChat(false)} show={showLiveChat} />}




            <Container style={containerStyle}>
                <div className="user-info">
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                            <Typography variant="h5" style={{ paddingTop: "10px", paddingBottom: "10px" }}>Personal Information</Typography>
                            <Paper>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Last Name" secondary={isEditing ? (
                                            <Input
                                                value={editedUserProfile.lastName}
                                                onChange={(e) => handleFieldChange("lastName", e.target.value)}
                                                style={{ padding: '1px', height: '45px' }}
                                            />
                                        ) : editedUserProfile.lastName} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText primary="First Name" secondary={isEditing ? (
                                            <Input
                                                value={editedUserProfile.firstName}
                                                onChange={(e) => handleFieldChange("firstName", e.target.value)}
                                                style={{ padding: '1px', height: '45px' }}
                                            />
                                        ) : editedUserProfile.firstName} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText primary="Username" secondary={isEditing ? (
                                            <Input
                                                value={editedUserProfile.username}
                                                onChange={(e) => handleFieldChange("username", e.target.value)}
                                                style={{ padding: '1px', height: '45px' }}
                                            />
                                        ) : editedUserProfile.username} />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} style={{paddingLeft: "30px", paddingRight: "30px"}}>
                            <Typography variant="h5" style={{paddingTop: "10px", paddingBottom: "10px"}}>Contact Information</Typography>
                            <Paper>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Email" secondary={isEditing ? (
                                            <Input
                                                value={editedUserProfile.email}
                                                onChange={(e) => handleFieldChange("email", e.target.value)}
                                                style={{ padding: '1px', height: '45px' }}
                                            />
                                        ) : editedUserProfile.email} />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} style={{paddingLeft: "30px", paddingRight: "30px"}}>
                            <Typography variant="h5" style={{paddingTop: "10px", paddingBottom: "10px"}}>Address Information</Typography>
                            <Paper>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="City" secondary={isEditing ? (
                                            <Input
                                                value={editedUserProfile.city}
                                                onChange={(e) => handleFieldChange("city", e.target.value)}
                                                style={{ padding: '1px', height: '45px' }}
                                            />
                                        ) : editedUserProfile.city} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText primary="Suburb" secondary={isEditing ? (
                                            <Input
                                                value={editedUserProfile.suburb}
                                                onChange={(e) => handleFieldChange("suburb", e.target.value)}
                                                style={{ padding: '1px', height: '45px' }}
                                            />
                                        ) : editedUserProfile.suburb} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText primary="Postcode" secondary={isEditing ? (
                                            <Input
                                                value={editedUserProfile.postcode}
                                                onChange={(e) => handleFieldChange("postcode", e.target.value)}
                                                style={{ padding: '1px', height: '45px' }}
                                            />
                                        ) : editedUserProfile.postcode} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText primary="Address" secondary={isEditing ? (
                                            <Input
                                                value={editedUserProfile.address}
                                                onChange={(e) => handleFieldChange("address", e.target.value)}
                                                style={{ padding: '1px', height: '45px' }}
                                            />
                                        ) : editedUserProfile.address} />
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
                            backgroundColor: "#add8e6",  // light blue in hex
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
                            backgroundColor: "#add8e6",  // light blue in hex
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
        </div>
    );
}

export default ProfilePage;