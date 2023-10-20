import {
  Typography,
  List,
  ListItem,
  Button,
  Container,
  ListItemText,
  Divider,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,

} from "@mui/material";
import ButtonAppBar from "../utils/ButtonAppBar";
import "../../styles/MainPage/Transaction.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../services/AuthContext";
import axios from "axios";
import { blue } from "@mui/material/colors";

const MyCharger = (props) => {
  const [titleOpacity, setTitleOpacity] = useState(0);

  const [showMapOverlay, setShowMapOverlay] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [chargers, setChargers] = useState([]);
  const [auth, setAuth] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedChargerId, setSelectedChargerId] = useState(null);

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

  const handleClickOpen = (chargerId) => {
    setDeleteModal(true);
    setSelectedChargerId(chargerId);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  const handleDelete = () =>{
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
    setChargers(chargers.filter(charger => charger.id !== selectedChargerId));
    setDeleteModal(false);
    }
  return (
    <div className="pageContainer">
      <ButtonAppBar />
      <div style={{ marginTop: 100 }}>
        <Container>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => window.history.back()}
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
          <List>
            {chargers.map((charger, index) => (
              <div key={charger.id}>
                <ListItem>
                  <ListItemText
                    primary={`${charger.name}`}
                    secondary={`${charger.charger_type.brand} -- ${charger.charger_type.power}`}
                  />
                  <Button style={{ marginLeft: "auto" }}>
                    Modify Chrager Information
                  </Button>{" "}
                  <span style={{ marginLeft: "auto" , color: blue }}> | </span>{" "}
                  <Button onClick={() => handleClickOpen(charger.id)}>Delete This Charger</Button>
                </ListItem>
                {index !== chargers.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </Container>
      </div>
      <Dialog
        open={deleteModal}
        onClose={handleClose}
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
          <Button onClick={handleClose}>Cancle</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyCharger;
