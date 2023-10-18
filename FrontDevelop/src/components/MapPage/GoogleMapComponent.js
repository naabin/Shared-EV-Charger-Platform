import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindowF, Marker } from "@react-google-maps/api";
import "../../styles/MapPage/GoogleMapComponent.css";
import markerImage from "../../matirial/Image/charger.png";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Rating,
} from "@mui/material";
import { Spinner } from "../utils/Spinner";
import { Typography } from "antd";

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
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8000/charger/")
      .then((res) => setChargers(res.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => setRerender(true), 500); // delay of 500ms
    return () => clearTimeout(timer);
  }, []);

  const sampleChargers = [
    {
      charger_type: {
        image: null,
        name: "Fast Charger",
        brand: "ACME",
        power: "50 kW",
        port_type: "Type 2",
        amp: "125A",
        warranty: 2,
      },
      address: {
        street_address: "123 Main Street",
        lat: -33.8688,
        lng: 151.2093,
        suburb: "Sydney",
        post_code: "2000",
        country: "Australia",
      },
      name: "Charger 1",
      number_of_stars: 4,
      number_of_rating: "100",
      renter: 3,
    },
    {
      charger_type: {
        image: null,
        name: "Standard Charger",
        brand: "XYZ",
        power: "22 kW",
        port_type: "Type 1",
        amp: "32A",
        warranty: 1,
      },
      address: {
        street_address: "456 Elm Street",
        lat: -33.9167,
        lng: 151.2333,
        suburb: "Sydney",
        post_code: "2000",
        country: "Australia",
      },
      name: "Charger 2",
      number_of_stars: 5,
      number_of_rating: "50",
      renter: 2,
    },
    {
      charger_type: {
        image: null,
        name: "Ultra Charger",
        brand: "FastCharge",
        power: "100 kW",
        port_type: "Type 3",
        amp: "250A",
        warranty: 3,
      },
      address: {
        street_address: "789 Oak Avenue",
        lat: -33.8679,
        lng: 151.209,
        suburb: "Sydney",
        post_code: "2000",
        country: "Australia",
      },
      name: "Charger 3",
      number_of_stars: 3,
      number_of_rating: "75",
      renter: 1,
    },
  ];

  const handleMapClick = (e) => {
    console.log(e);
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
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Charger Details</Typography>
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
                  {/* <p>
                    <strong>Average Rating:</strong>
                    {(
                      selectedCharger.number_of_stars /
                      selectedCharger.number_of_rating
                    ).toFixed(2)}
                  </p> */}
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
