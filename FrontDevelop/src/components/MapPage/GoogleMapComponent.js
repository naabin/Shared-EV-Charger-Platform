import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindowF, Marker } from "@react-google-maps/api";
import "../../styles/MapPage/GoogleMapComponent.css";
import markerImage from "../../matirial/Image/charger.png";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pay_Page from "../Pay_Page/PayPage";
import checkinBtn from "../../matirial/Image/CheckInBtn.png";
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
import { getUserById, getOwnerDetails } from "../../services/auth";
import chatBtn from "../../matirial/Image/Chatbtn.png";
import LiveChat from "./LiveChat";
import { ChargerActivity } from "./ChargerActivity";
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
  const [comment, setComment] = useState("");
  const [auth, setAuth] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("user")));
    axios
      .get("http://localhost:8000/charger/")
      .then(async (res) => {
        const chargersWithOwnerDetails = await Promise.all(
          res.data.map(async (charger) => {
            const ownerDetails = await getOwnerDetails(charger.renter);
            return { ...charger, owner_details: ownerDetails };
          })
        );

        setChargers(chargersWithOwnerDetails);
      })
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
        .catch((err) => setReviews([]));
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

  const [isClicked, setIsClicked] = useState(false);

  // Step 4: Handle the button click event
  const handleButtonClick = () => {
    setIsClicked(true);
    console.log("ok"); // Print "ok" to the console
  };
  const buttonStyle = {
    background: "transparent", // Set the background color to transparent
    border: "none", // Remove the border
    cursor: "pointer", // Add a pointer cursor on hover
  };
  return (
    <div className="map-container">
      {showChat && (
        <LiveChat
          show={true}
          initialReceiver={selectedCharger.owner_details.username}
        />
      )}
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
                key={`marker-${charger.id}`}
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
                <h2 style={{ display: "flex", justifyContent: "center" }}>
                  {selectedCharger.name}
                </h2>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Rating defaultValue={3} readOnly max={5} />
                </div>

                {!imageLoaded ? <Spinner /> : null}
                <img
                  onLoad={(e) => {
                    setImageLoaded(e.nativeEvent.returnValue);
                  }}
                  style={{ objectFit: "contain", height: 90 }}
                  src={
                    selectedCharger && selectedCharger.charger_type.image.image
                  }
                  alt={selectedCharger.charger_type.image.name}
                />
                <div className="checkinBtn-continer">
                  <button className="checkinBtn">
                    <Button
                      onClick={showModal}
                      style={{
                        backgroundImage: `url(${checkinBtn})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        border: "none",
                        color: "white", // or any other color that you want for the text
                        width: "100px", // Adjust this value based on the size you want
                        height: "100px", // Adjust this value based on the size you want
                      }}
                    ></Button>
                    {isModalOpen && (
                      <ChargerActivity
                        handleOk={() => setIsModalOpen(false)}
                        handleCancel={() => setIsModalOpen(false)}
                        charger={selectedCharger}
                        isModalOpen={isModalOpen}
                      />
                    )}
                  </button>
                </div>
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
                  <p>
                    <button
                      style={buttonStyle}
                      onClick={() => setShowChat(true)}
                    >
                      <img
                        src={chatBtn}
                        alt="Chat Button"
                        width={20}
                        height={20}
                      />
                    </button>
                    <strong>Renter:</strong>
                    {selectedCharger.owner_details.username}
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
                        <div key={index}>
                          <Chip key={index} label={rev.contents} />
                          <Chip label={rev.user} variant="outlined" />
                        </div>
                      );
                    })}
                  </Typography>
                </AccordionDetails>
                {/*</Accordion>*/}
                {/*/!* TODO: need to enable this one again after user uses the  *!/*/}
                {/*<Accordion disabled>*/}
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
