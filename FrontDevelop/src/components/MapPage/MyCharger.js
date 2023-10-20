import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  Accordion,
  Rating,
  Switch,
} from "@mui/material";
import ButtonAppBar from "../utils/ButtonAppBar";
import "../../styles/MainPage/Transaction.css";
import { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";

const MyCharger = (props) => {
  const [titleOpacity, setTitleOpacity] = useState(0);
  const [chargers, setChargers] = useState([]);
  const [auth, setAuth] = useState(null);
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
          <Grid container spacing={2}>
            {chargers.map((charger, index) => (
              // <div key={charger.id}>
              <Grid key={index} xs={4} item>
                <Accordion expanded={false}>
                  <Card>
                    <CardHeader
                      title={charger.name}
                      subheader={<Rating readOnly value={charger.rating} />}
                      avatar={<Switch />}
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                    />
                    <CardMedia
                      // height={140}
                      component="img"
                      image={charger.charger_type.image.image}
                      alt={charger.charger_type.image.name}
                    />
                  </Card>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default MyCharger;
