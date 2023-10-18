import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindowF, Marker } from "@react-google-maps/api";
import "../../styles/MapPage/GoogleMapComponent.css";
import markerImage from "../../matirial/Image/charger.png";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pay_Page from "../Pay_Page/Pay_Page";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Rating,
  TextField,
} from "@mui/material";
import { Spinner } from "../utils/Spinner";
import { Button, Typography } from "antd";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function GoogleMapComponent({
  center,
  defaultProps = { zoom: 10 },
  data = [],
  onPlaceSelect,
  onMapClick,
}) {
  const [rerender, setRerender] = useState(false);
  const [selectedCharger, setSelectedCharger] = useState(null);
  const [chargers, setChargers] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [comment, setComment] = useState(null);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("user")));
    axios
      .get("http://localhost:8000/charger/")
      .then((res) => setChargers(res.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => setRerender(true), 500); // delay of 500ms
    return () => clearTimeout(timer);
  }, []);

  const loadReviews = (chargerId) => {
    if (chargerId !== null) {
      axios
        .get(`http://localhost:8000/comment/get_comments_by_charger`, {
          params: {
            charger_id: chargerId,
          },
        })
        .then((res) => {
          setReviews(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const sendComment = (chargerId) => {
    const data = {
      contents: comment,
      user: auth.id,
      charger: chargerId,
    };
    if (auth && auth.id) {
      axios
        .post("http://localhost:8000/comment/", JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.access,
          },
        })
        .then((res) => {
          console.log(res.data);
          setComment("");
        })
        .catch((err) => console.log(err));
    }
  };

  const handleMapClick = (e) => {
    if (onMapClick) onMapClick(e.latLng.lat(), e.latLng.lng());
  };

  const showChargerInfo = (charger) => {
    setSelectedCharger(charger);
  };

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={defaultProps ? defaultProps.zoom : 10}
        onClick={handleMapClick}
      >
        {rerender &&
          chargers.map((charger, index) => {
            return (
              <Marker
                key={index}
                position={{
                  lat: JSON.parse(charger.address.lat),
                  lng: JSON.parse(charger.address.lng),
                }}
                onClick={() => showChargerInfo(charger)}
                icon={{
                  url: markerImage,
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            );
          })}
        {selectedCharger && (
          <InfoWindowF
            position={{
              lat: JSON.parse(selectedCharger.address.lat),
              lng: JSON.parse(selectedCharger.address.lng),
            }}
            onCloseClick={() => {
              setSelectedCharger(null);
              setImageLoaded(false);
            }}
          >
            <div className="info-container">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h2>{selectedCharger.name}</h2>
                <Rating defaultValue={3} readOnly max={5} />
              </div>

              {!imageLoaded ? <Spinner /> : null}
              <img
                onLoad={(e) => setImageLoaded(true)}
                src={
                  selectedCharger && selectedCharger.charger_type.image.image
                }
                alt={selectedCharger.charger_type.image.name}
              />
              <div className="checkinBtn-continer">
                <button className="checkinBtn">
                  <Pay_Page />
                </button>
              </div>

              <Accordion>
                <AccordionSummary
                  aria-controls="panel1-content"
                  expandIcon={<ExpandMoreIcon />}
                  id="panel1-header"
                >
                  <Typography>
                    <strong> Charger Details </strong>
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <p>
                    <strong>Type:</strong> {selectedCharger.charger_type.name}
                  </p>
                  <p>
                    <strong>Power:</strong> {selectedCharger.charger_type.power}
                  </p>
                  <p>
                    <strong>Port Type:</strong>
                    {selectedCharger.charger_type.port_type}
                  </p>
                  <p>
                    <strong>Amp:</strong> {selectedCharger.charger_type.amp}
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {selectedCharger.address.street_address}
                  </p>
                </AccordionDetails>
              </Accordion>
              <Accordion onChange={() => loadReviews(selectedCharger.id)}>
                <AccordionSummary
                  aria-controls="panel2"
                  id="panel2-header"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>
                    <strong>Reviews</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {reviews.map((rev, index) => {
                      return (
                        <>
                          <Chip key={index} label={rev.contents} />
                          <Chip label={rev.user} variant="outlined" />
                        </>
                      );
                    })}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              {/* TODO: need to enable this one again after user uses the  */}
              <Accordion disabled>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <div>
                    <Rating />
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="search"
                    label="Leave review"
                    variant="filled"
                    id="filled-search"
                  />
                  <Button
                    onClick={() => sendComment(selectedCharger.id)}
                    type="submit"
                    variant="outlined"
                  >
                    Send
                  </Button>
                </AccordionDetails>
              </Accordion>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
}

export default GoogleMapComponent;
