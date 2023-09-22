import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  Button,
  Container,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import ButtonAppBar from "./ButtonAppBar";
import "../../styles/MainPage/Transaction.css";
import { useState, useEffect } from "react";

const chargers = [
  {
    id: 1,
    chargerName: "XXXXX",
    position: "Auguest 1 Street",
    Brand: "Tesla",
    power: "220V",
    Price: "$10",
  },
  {
    id: 2,
    chargerName: "XXXXX",
    position: "Auguest 2 Street",
    Brand: "Xiaopeng",
    power: "110V",
    Price: "$20",
  },
  {
    id: 3,
    chargerName: "XXXXX",
    position: "Auguest 3 Street",
    Brand: "Weilai",
    power: "220V",
    Price: "$30",
  },
];

const MyCharger = (props) => {
  const [titleOpacity, setTitleOpacity] = useState(0);

  useEffect(() => {
    setTitleOpacity(1);
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
            XXX's Charger
          </Typography>
          <Button onClick={props.change}>Register a new Charger</Button>
          <List>
            {chargers.map((charger, index) => (
              <div key={charger.id}>
                <ListItem>
                  <ListItemText
                    primary={`${charger.chargerName} - Price:${charger.Price} :  ${charger.position} `}
                    secondary={`${charger.Brand} -- ${charger.power}`}
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
