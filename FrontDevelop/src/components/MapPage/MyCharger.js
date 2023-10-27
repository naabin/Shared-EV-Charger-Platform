import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardContent,
  Accordion,
  Rating,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  AccordionSummary,
  AccordionDetails,
  Menu,
  MenuItem,
} from "@mui/material";
import ButtonAppBar from "../utils/ButtonAppBar";
import "../../styles/MainPage/Transaction.css";
import React, { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import LiveChat from "./LiveChat";
import { useNavigate } from "react-router-dom";
import Updating from "../MainPage/UpdatingChargerModel";

const ChargerPaper = styled(Paper)(({ theme }) => ({
  // width: `100%`,
  // height: 120,
  lineHeight: 0.5,
  padding: theme.spacing(2),
  // ...theme.typography.body2,
  // textAlign: "center",
}));

const MyCharger = (props) => {
  const [titleOpacity, setTitleOpacity] = useState(0);
  const [chargers, setChargers] = useState([]);
  const [auth, setAuth] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedChargerId, setSelectedChargerId] = useState(null);
  const [contentExpanded, setContentExpanded] = useState(null);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [updateForm, setUpdateForm] = useState(false);
  const [chargerData, setChargerData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const access_token = JSON.parse(localStorage.getItem("user"));
    setAuth(access_token);
    if (access_token && access_token.access) {
      axios
        .get("http://localhost:8000/charger/get_charger_by_renter_id/", {
          params: { renter: access_token.id },
          headers: {
            Authorization: "Bearer " + access_token.access,
          },
        })
        .then((res) => setChargers(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  const makeAvailable = (charger) => {
    const access_token = JSON.parse(localStorage.getItem("user"));
    if (access_token && access_token.access) {
      axios
        .post(
          "http://localhost:8000/charger/charger_status/",
          {},
          {
            params: { id: charger.id },
            headers: { Authorization: `Bearer ${access_token.access}` },
          }
        )
        .then((res) => {
          const updatedCharger = res.data;
          const arr = [...chargers];
          const updatedChargerIndex = arr.findIndex(
            (charger) => charger.id === updatedCharger.id
          );
          arr.splice(updatedChargerIndex, 1, updatedCharger);
          setChargers(arr);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleExpansion = (id) => (_, isExpanded) => {
    setContentExpanded(isExpanded ? id : null);
  };

  const handleDeleteOpen = () => {
    setDeleteModal(true);
    setAnchorEl(null);
  };

  const handleDeleteClose = () => {
    setDeleteModal(false);
  };

  const handleMenuOpen = (id, chargerId) => {
    setAnchorEl(id);
    setSelectedChargerId(chargerId);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    //setSelectedChargerId(null);
  };

  const handleUpdateForm = () => {
    setUpdateForm(true);
    handleMenuClose();
  };

  const handleCloseForm = () => {
    setUpdateForm(false);
    //setChargerData({});
  };

  const handleDelete = () => {
    if (selectedChargerId) {
      axios
        .delete(`http://localhost:8000/charger/${selectedChargerId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.access,
          },
        })
        .then((res) => {
          console.log("Successfully deleted charger");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Missing auth.id or chargers.id, cannot delete charger.");
    }

    setChargers(chargers.filter((charger) => charger.id !== selectedChargerId));
    setDeleteModal(false);
  };

  const handleBeforeModify = async () => {
    try {
      if (selectedChargerId) {
        const response = await axios.get(
          `http://localhost:8000/charger/${selectedChargerId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.access,
            },
          }
        );

        const data = response.data;
        setChargerData(data);
      } else {
        console.log("Missing auth.id or chargers.id");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(chargerData);
  }, [chargerData]);

  return (
    <div className="pageContainer">
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleUpdateForm();
            handleBeforeModify();
          }}
        >
          Modify This Charger
        </MenuItem>
        <MenuItem onClick={() => handleDeleteOpen()}>
          Delete This Charger
        </MenuItem>
      </Menu>
      <Updating
        showDialog={updateForm}
        closeEvent={handleCloseForm}
        id={selectedChargerId}
      />
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
      <div style={{ marginTop: 100 }}>
        <Container>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            // onClick={() => window.history.back()}
            onClick={() => (window.location.href = "/mapPage")}
          >
            <Typography variant="h5">&lt; Back To Map</Typography>
          </IconButton>
          <Typography
            variant="h4"
            style={{
              margin: "30px 0",
              transition: "opacity 1s",
              opacity: titleOpacity,
            }}
          >
            {auth && auth.username}
          </Typography>
          <Button onClick={props.change}>Register a new Charger</Button>
          <Grid container spacing={2}>
            {chargers.map((charger, index) => (
              <Grid key={charger.id} xs={4} item>
                <Accordion
                  key={`details-${charger.id}`}
                  onChange={handleExpansion(`details-${charger.id}`)}
                  expanded={contentExpanded === `details-${charger.id}`}
                >
                  <Card>
                    <CardHeader
                      title={charger.name}
                      subheader={<Rating readOnly value={charger.rating} />}
                      avatar={
                        <Switch
                          checked={charger.status}
                          value={charger.status}
                          onChange={() => makeAvailable(charger)}
                        />
                      }
                      action={
                        <IconButton
                          onClick={(event) =>
                            handleMenuOpen(event.currentTarget, charger.id)
                          }
                          aria-label="settings"
                        >
                          <MoreVertIcon />
                        </IconButton>
                      }
                    />

                    <CardMedia
                      height={200}
                      sx={{ objectFit: "contain" }}
                      component="img"
                      image={charger.charger_type.image.image}
                      alt={charger.charger_type.image.name}
                    />
                    <CardContent>
                      <Accordion
                        key={index}
                        onChange={handleExpansion(index)}
                        expanded={contentExpanded === index}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>Charger Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <ChargerPaper elevation={24}>
                            <p>
                              <strong>Name: </strong>{" "}
                              {charger.charger_type.name}
                            </p>
                            <p>
                              <strong>Brand: </strong>{" "}
                              {charger.charger_type.brand}
                            </p>
                            <p>
                              <strong>Power: </strong>{" "}
                              {Number(charger.charger_type.power).toFixed(2)}kHz{" "}
                              {/*{"  "}*/}
                              {/*<strong>Amp: </strong>*/}
                              {/*{Number(charger.charger_type.amp).toFixed(2)} Ohms*/}
                            </p>
                            <p>
                              <strong>Amp: </strong>{" "}
                              {Number(charger.charger_type.amp).toFixed(2)} Ohms
                            </p>
                            <p>
                              <strong>Port Type: </strong>{" "}
                              {charger.charger_type.port_type}
                            </p>
                          </ChargerPaper>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        key={charger.id}
                        onChange={handleExpansion(charger.id)}
                        expanded={contentExpanded === charger.id}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>Charger Location</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <ChargerPaper
                            elevation={24}
                            sx={{
                              maxWidth: "100%", // Ensures the paper doesn't exceed its parent's width
                              wordWrap: "break-word", // Ensures long words or strings break onto the next line
                              padding: 2, // Adds some padding for aesthetics
                            }}
                          >
                            <p sx={{ margin: "0" }}>
                              {" "}
                              {/* Remove default margins of <p> */}
                              <strong>Suburb: </strong>
                              {charger.address.suburb}
                            </p>
                            <p sx={{ margin: "0" }}>
                              <strong>Post_code : </strong>
                              {charger.address.post_code}
                            </p>
                            <p
                              style={{
                                position: "relative",
                                fontSize: "1em",
                                lineHeight: "1.5em",
                                zIndex: 1,
                                margin: "0",
                                overflowWrap: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              <strong>Street Address: </strong>
                              {charger.address.street_address}
                            </p>
                          </ChargerPaper>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion
                        key={charger.charger_type.id + 1000}
                        onChange={handleExpansion(
                          charger.charger_type.id + 1000
                        )}
                        expanded={
                          contentExpanded === charger.charger_type.id + 1000
                        }
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>Customer revies</Typography>
                        </AccordionSummary>
                      </Accordion>
                    </CardContent>
                  </Card>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      <Dialog
        open={deleteModal}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this charger?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="warning">This action cannot be reverted!</Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancle</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyCharger;
