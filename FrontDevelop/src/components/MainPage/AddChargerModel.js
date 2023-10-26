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

function AddChargerModel(props) {
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

  const [activeStep, setActiveStep] = useState(0);

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
    setStreet("");
    setSuburb("");
    setCountry("");
    setLat(null);
    setLng(null);
    setPostCode(null);
    setState("");
    props.closeEvent();
  };

  const handleOk = () => {
    setSubmitting(true);
    let data = null;
    if (image.thumbUrl && auth.id) {
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
        .post("http://localhost:8000/charger/", JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.access,
          },
        })
        .then((res) => {
          console.log("successfully created charger");
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
      title="Add New Charger"
      visible={props.showDialog}
      onOk={() => handleOk()}
      onCancel={handleCancel}
    >
      <Box>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              <strong>Fill out the address</strong>
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
              <strong>Charger Details</strong>
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
              <strong>Upload Image</strong>
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
                        Submit
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

  // return (
  //   <Modal
  // title="Add New Charger"
  // visible={props.showDialog}
  // onOk={() => handleOk()}
  // onCancel={props.closeEvent}
  //   >
  //     {/* <input ref={inputRef}></input> */}
  //     <Form
  //       onSubmitCapture={handleOk}
  //       form={form} // Pass the form instance here
  //       name="basic"
  //       labelCol={{ span: 10 }}
  //       wrapperCol={{ span: 50 }}
  //       style={{ maxWidth: 1000 }}
  //       initialValues={{ remember: true }}
  //       autoComplete="off"
  //     >
  //       <input value={street} onChange={(e) => setStreet(e.target.value)} />
  //       <Form.Item>
  //         <input ref={inputRef} onChange={autoComplete} />
  //       </Form.Item>
  //       <Button onClick={() => setShowMapOverlay(true)}>
  //         Find My Location on Map
  //       </Button>
  //       <Form.Item></Form.Item>
  //       <Form.Item label="Selected Latitude">
  //         <Input
  //           value={selectedLocation ? `${selectedLocation.lat}` : ""}
  //           readOnly
  //         />
  //       </Form.Item>

  //       <Form.Item label="Selected Longitude">
  //         <Input
  //           value={selectedLocation ? `${selectedLocation.lng}` : ""}
  //           readOnly
  //         />
  //       </Form.Item>

  //       <Form.Item
  //         label="Charger Location"
  //         name="CL"
  //         rules={[
  //           {
  //             required: true,
  //             message: "Type location here",
  //           },
  //         ]}
  //       >
  //         <Input
  //           value={street}
  //           placeholder="e.g. 123 Main St, Springfield, IL"
  //         />
  //       </Form.Item>

  //       <Form.Item
  //         label="Country"
  //         name="country" // This name is used in the data object in handleOk function
  //         rules={[
  //           {
  //             required: true,
  //             message: "Type country name here",
  //           },
  //         ]}
  //       >
  //         <Input />
  //       </Form.Item>

  //       <Form.Item
  //         label="Suburb"
  //         name="suburb" // This name is used in the data object in handleOk function
  //         rules={[
  //           {
  //             required: true,
  //             message: "Type suburb name here",
  //           },
  //         ]}
  //       >
  //         <Input />
  //       </Form.Item>

  //       <Form.Item
  //         label="Postcode"
  //         name="postCode" // This name is used in the data object in handleOk function
  //         rules={[
  //           {
  //             required: true,
  //             message: "Type postcode here",
  //           },
  //         ]}
  //       >
  //         <Input />
  //       </Form.Item>

  //       <Form.Item
  //         label="Charger Type"
  //         name="CT"
  //         rules={[
  //           {
  //             required: true,
  //             message: "Type type here",
  //           },
  //         ]}
  //       >
  //         <Input />
  //       </Form.Item>

  //       <Form.Item
  //         label="Charger Power"
  //         name="chargerPower" // Changed name to 'chargerPower'
  //         rules={[
  //           {
  //             required: true,
  //             message: "Type power here",
  //           },
  //         ]}
  //       >
  //         <Input />
  //       </Form.Item>

  //       <Form.Item
  //         label="Charger Amp"
  //         name="Amp"
  //         rules={[
  //           {
  //             required: true,
  //             message: "Type amp here",
  //           },
  //         ]}
  //       >
  //         <Input />
  //       </Form.Item>

  //       <Form.Item
  //         label="Charger Price"
  //         name="chargerPrice" // Changed name to 'chargerPrice'
  //         rules={[
  //           {
  //             required: true,
  //             message: "Type price here",
  //           },
  //         ]}
  //       >
  //         <Input />
  //       </Form.Item>

  //       <Form.Item
  //         label="Charger Name"
  //         name="name" // Adjusted name to match backend
  //         rules={[{ required: true, message: "Type charger name here" }]}
  //       >
  //         <Input />
  //       </Form.Item>

  //       <Form.Item
  //         label="Brand"
  //         name="brand" // Adjusted name to match backend
  //         rules={[{ required: true, message: "Type brand here" }]}
  //       >
  //         <Input />
  //       </Form.Item>

  //       <Form.Item
  //         label="Upload Charger Picture:"
  //         name="image" // Keep this as 'name' to match backend
  //         valuePropName="picture" // Keep this to maintain fileList structure
  //         getValueFromEvent={normFile}
  //       >
  //         {/* <input type="file" onChange={(e) => console.log(e.target.value[0])} /> */}
  // <Upload type="multipart/form-data" listType="picture-card">
  //   <div>
  //     <PlusOutlined />
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </div>
  // </Upload>
  //       </Form.Item>
  //     </Form>
  //     {showMapOverlay && (
  //       <div
  //         style={{
  //           position: "fixed",
  //           top: 0,
  //           left: 0,
  //           width: "100vw",
  //           height: "100vh",
  //           zIndex: 1000,
  //         }}
  //       >
  //         <GoogleMapComponent
  //           center={{ lat: -33.8688, lng: 151.2093 }}
  //           defaultProps={{ zoom: 11 }}
  //           onMapClick={(lat, lng) => {
  //             setSelectedLocation({ lat, lng });
  //             setShowMapOverlay(false);
  //           }}
  //         />
  //         <Button onClick={() => setShowMapOverlay(false)}>Close Map</Button>
  //       </div>
  //     )}
  //   </Modal>
  // );
}

export default AddChargerModel;
