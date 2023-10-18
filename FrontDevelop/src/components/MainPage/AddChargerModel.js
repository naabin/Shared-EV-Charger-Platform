import React, { useState, useEffect } from "react";
import { Form, Input, Modal, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import GoogleMapComponent from "../MapPage/GoogleMapComponent";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function AddChargerModel(props) {
  const [showMapOverlay, setShowMapOverlay] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("user")));
  }, []);
  const handleOk = () => {
    setSubmitting(true);
    form.validateFields().then(async (values) => {
      const { image, ...otherValues } = await values; // Destructure to separate image from other values
      let data = null;
      image
        .then((e) => {
          if (e && e.file && e.file.thumbUrl && auth.id) {
            data = {
              charger_type: {
                name: otherValues.name,
                brand: otherValues.brand,
                power: otherValues.chargerPower
                  ? otherValues.chargerPower.toString()
                  : "",
                port_type: otherValues.CT, // Assuming you have a form field named 'CT'
                amp: otherValues.Amp.toString(),
                warranty: parseInt(otherValues.warranty, 10) || 0, // Default to 0 if undefined
                image: {
                  name: "chargerImage",
                  image: e.file.thumbUrl,
                },
              },

              address: {
                street_address: otherValues.CL,
                lat: selectedLocation ? selectedLocation.lat.toString() : "",
                lng: selectedLocation ? selectedLocation.lng.toString() : "",
                suburb: otherValues.suburb,
                post_code: otherValues.postCode,
                country: otherValues.country,
              },
              name: otherValues.name,
              number_of_stars: 0, // Default to 0 if undefined
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
        })
        .catch((errorInfo) => {
          console.log("Validate Failed:", errorInfo);
        });
    });
  };

  const normFile = async (e) => {
    return e;
  };

  return (
    <Modal
      title="Add New Charger"
      visible={props.showDialog}
      onOk={() => handleOk()}
      onCancel={props.closeEvent}
    >
      <Form
        onSubmitCapture={handleOk}
        form={form} // Pass the form instance here
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 50 }}
        style={{ maxWidth: 1000 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Button onClick={() => setShowMapOverlay(true)}>
          Find My Location on Map
        </Button>
        <Form.Item label="Selected Latitude">
          <Input
            value={selectedLocation ? `${selectedLocation.lat}` : ""}
            readOnly
          />
        </Form.Item>

        <Form.Item label="Selected Longitude">
          <Input
            value={selectedLocation ? `${selectedLocation.lng}` : ""}
            readOnly
          />
        </Form.Item>

        <Form.Item
          label="Charger Location"
          name="CL"
          rules={[
            {
              required: true,
              message: "Type location here",
            },
          ]}
        >
          <Input placeholder="e.g. 123 Main St, Springfield, IL" />
        </Form.Item>

        <Form.Item
          label="Country"
          name="country" // This name is used in the data object in handleOk function
          rules={[
            {
              required: true,
              message: "Type country name here",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Suburb"
          name="suburb" // This name is used in the data object in handleOk function
          rules={[
            {
              required: true,
              message: "Type suburb name here",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Postcode"
          name="postCode" // This name is used in the data object in handleOk function
          rules={[
            {
              required: true,
              message: "Type postcode here",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Charger Type"
          name="CT"
          rules={[
            {
              required: true,
              message: "Type type here",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Charger Power"
          name="chargerPower" // Changed name to 'chargerPower'
          rules={[
            {
              required: true,
              message: "Type power here",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Charger Amp"
          name="Amp"
          rules={[
            {
              required: true,
              message: "Type amp here",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Charger Price"
          name="chargerPrice" // Changed name to 'chargerPrice'
          rules={[
            {
              required: true,
              message: "Type price here",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Charger Name"
          name="name" // Adjusted name to match backend
          rules={[{ required: true, message: "Type charger name here" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand" // Adjusted name to match backend
          rules={[{ required: true, message: "Type brand here" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Upload Charger Picture:"
          name="image" // Keep this as 'name' to match backend
          valuePropName="picture" // Keep this to maintain fileList structure
          getValueFromEvent={normFile}
        >
          {/* <input type="file" onChange={(e) => console.log(e.target.value[0])} /> */}
          <Upload type="multipart/form-data" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
      {showMapOverlay && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1000,
          }}
        >
          <GoogleMapComponent
            center={{ lat: -33.8688, lng: 151.2093 }}
            defaultProps={{ zoom: 11 }}
            onMapClick={(lat, lng, e) => {
              console.log(e);
              setSelectedLocation({ lat, lng });
              setShowMapOverlay(false);
            }}
          />
          <Button onClick={() => setShowMapOverlay(false)}>Close Map</Button>
        </div>
      )}
    </Modal>
  );
}

export default AddChargerModel;
