import {
  Typography,
  List,
  ListItem,
  Button,
  Container,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import ButtonAppBar from "../utils/ButtonAppBar";
import "../../styles/MainPage/Transaction.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../services/AuthContext";
import axios from "axios";

const MyCharger = (props) => {
  const [titleOpacity, setTitleOpacity] = useState(0);

  const [showMapOverlay, setShowMapOverlay] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [chargers, setChargers] = useState([]);
  const userContext = useContext(AuthContext);
  useEffect(() => {
    // setTitleOpacity(1);
    axios
      .get("http://localhost:8000/charger")
      .then((res) => setChargers(res.data))
      .catch((err) => console.log(err));
  }, []);
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
            {userContext && userContext.username}
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
                  </Button>
                </ListItem>
                {index !== chargers.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </Container>
      </div>
    </div>
  );
};

export default MyCharger;
