import React, { useState, useEffect, useRef } from "react";
import { Input, Modal, Upload, Button as LoadingButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import {
  Box,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Button,
} from "@mui/material";

function UpdatingChargerModel(props) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [street, setStreet] = useState("");
  const [postCode, setPostCode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [portType, setPortType] = useState("");
  const [power, setPower] = useState("");
  const [amp, setAmp] = useState("");
  const [price, setPrice] = useState("");

  const [image, setImage] = useState(null);
 const [data,setData] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  


  useEffect(() => {
    axios
      .get(`http://localhost:8000/charger/${props.id}`, {
       headers: {
         "Content-Type": "application/json",
         Authorization: "Bearer " + auth.access,
       },
     })
     .then((res) => {
       setStreet(res.data.address.street_address);
       setSuburb(res.data.address.suburb);
       setPostCode(res.data.address.post_code);
       setState(res.data.address.postCode);
       setCountry(res.data.address.country);
       setModel(res.data.charger_type.model);
       setBrand(res.data.charger_type.brand);
       setPortType(res.data.charger_type.port_type);
       setPower(res.data.charger_type.power);
       setAmp(res.data.charger_type.amp);
       setPrice(res.data.hourly_rate);
       setImage(res.data.charger_type.image.image);
     })
     .catch((err) => {
       console.log(err);
     });
     }, [auth.access, props.id]);
 

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("user")));
  }, []);
  const inputRef = useRef();
  const autoComplete = () => {
    const googleAutoComplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country: "au" },
        fields: ["address_components", "geometry", "icon", "name"],
      }
    );
    googleAutoComplete.addListener("place_changed", () => {
      const place = googleAutoComplete.getPlace();
      const latLng = place.geometry.location;
      setLat(latLng.lat());
      setLng(latLng.lng());
      for (const component of place.address_components) {
        const componentType = component.types[0];
        switch (componentType) {
          case "subpremise":
            setStreet(component.long_name.toLocaleUpperCase());
            break;
          case "street_number":
            setStreet(
              (prev) => prev + " " + component.long_name.toLocaleUpperCase()
            );
            break;
          case "route":
            setStreet(
              (prev) => prev + " " + component.long_name.toLocaleUpperCase()
            );
            break;
          case "locality":
            setSuburb(component.long_name.toLocaleUpperCase());
            break;
          case "administrative_area_level_1":
            setState(component.short_name);
            break;
          case "country":
            setCountry(component.long_name);
            break;
          case "postal_code":
            setPostCode(component.long_name);
            break;
          default:
            break;
        }
      }
    });
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  const handleCancel = () => {
    props.closeEvent();
  };

  const handleOk = () => {
    setSubmitting(true);
    if (props.id) {
      axios
        .delete(`http://localhost:8000/charger/${props.id}`, {
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
    }
    let data = null;
    if (image.thumbUrl && auth.id ){
      data = {
        charger_type: {
          name: model,
          brand,
          power,
          port_type: portType,
          amp,
          image: {
            name: "chargerImage",
            image: image.thumbUrl,
          },
        },

        address: {
          street_address: street,
          lat,
          lng,
          suburb,
          post_code: postCode,
          country,
        },
        name: model,
        hourly_rate: price,
        number_of_stars: 0,
        number_of_rating: 0,
        renter: auth.id,
      };
    }
    data && 
      axios
        .post('http://localhost:8000/charger/',JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.access,
          },
        })
        .then((res) => {
          console.log("successfully update charger");
          setSubmitting(false);
          navigate("/myCharger");
          props.closeEvent();
        })
        .catch((err) => {
          console.log(err);
        });
  };
  
      
    
  

  return (
    <Modal
      title="Update your charger"
      visible={props.showDialog}
      onOk={() => handleOk()}
      onCancel={handleCancel}
    >
      <Box>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              <strong>Update address</strong>
            </StepLabel>
            <StepContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <input
                    placeholder="Search Address..."
                    className="search-button"
                    ref={inputRef}
                    onChange={autoComplete}
                  ></input>
                </Grid>
                <Grid item xs={8}>
                  <Input value={street} placeholder="Street" />
                </Grid>
                <Grid item xs={4}>
                  <Input value={suburb} placeholder="Suburb" />
                </Grid>
                <Grid item xs={4}>
                  <Input value={postCode} placeholder="PostCode"></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input value={state} placeholder="State" />
                </Grid>
                <Grid item xs={4}>
                  <Input value={country} placeholder="Country" />
                </Grid>
                <Grid item xl={6}>
                  <Button
                    sx={{ mt: 1, mr: 1 }}
                    variant="contained"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <strong>Update Details</strong>
            </StepLabel>
            <StepContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Input
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Model"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Brand"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Input
                    value={portType}
                    onChange={(e) => setPortType(e.target.value)}
                    placeholder="Port Type"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Input
                    value={power}
                    onChange={(e) => setPower(e.target.value)}
                    placeholder="Power"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Input
                    value={amp}
                    onChange={(e) => setAmp(e.target.value)}
                    placeholder="Amp"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    prefix="$"
                    placeholder="Hourly rate"
                    suffix="PER HOUR"
                  />
                </Grid>
                <Grid item xs={8}>
                  <Button
                    variant="contained"
                    sx={{ mt: 1, mr: 1 }}
                    onClick={handleNext}
                  >
                    Continue
                  </Button>
                  <Button
                    sx={{ mt: 1, mr: 1 }}
                    variant="outlined"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <strong>Update Image</strong>
            </StepLabel>
            <StepContent>
              <Grid container>
                <Grid item xs={12}>
                  <Upload
                    onChange={(e) => setImage(e.file)}
                    type="multipart/form-data"
                    listType="picture-card"
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Grid>
                <Grid item xs={12}>
                  {submitting ? (
                    <LoadingButton loading={submitting} />
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        sx={{ mt: 1, mr: 1 }}
                        onClick={handleOk}
                      >
                        Update
                      </Button>
                      <Button
                        sx={{ mt: 1, mr: 1 }}
                        variant="outlined"
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                    </>
                  )}
                </Grid>
              </Grid>
            </StepContent>
          </Step>
        </Stepper>
      </Box>
    </Modal>
  );

                  }

export default UpdatingChargerModel;
