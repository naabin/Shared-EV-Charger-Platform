import React, { useState } from "react";
import { Form, Input, Modal, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import GoogleMapComponent from '../MapPage/GoogleMapComponent';

function AddChargerModel(props) {
  const [showMapOverlay, setShowMapOverlay] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleOk = () => {};
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Modal
      title="Add New Charger"
      open={props.showDialog}
      onOk={handleOk}
      onCancel={props.closeEvent}
    >
      <Form
        name="basic"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 50,
        }}
        style={{
          maxWidth: 1000,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="First Name"
          name="FN"
          rules={[
            {
              required: true,
              message: "Type first name here",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name: "
          name="LN"
          rules={[
            {
              required: true,
              message: "Type last name here",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Button onClick={() => setShowMapOverlay(true)}>Find My Location on Map</Button>
        <Form.Item
            label="Selected Latitude"
        >
          <Input value={selectedLocation ? `${selectedLocation.lat}` : ''} readOnly />
        </Form.Item>

        <Form.Item
            label="Selected Longitude"
        >
          <Input value={selectedLocation ? `${selectedLocation.lng}` : ''} readOnly />
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
          <Input value={selectedLocation ? `${selectedLocation.lat}, ${selectedLocation.lng}` : ''} readOnly />
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
          name="CP"
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
          label="Charger Price"
          name="CP"
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
          label="Upload Charger Picture:"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>


      </Form>
      {showMapOverlay && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000 }}>
            <GoogleMapComponent
                center={{ lat: -33.8688, lng: 151.2093 }} // Sydney as default
                defaultProps={{ zoom: 11 }}
                onMapClick={(lat, lng) => {
                  setSelectedLocation({ lat, lng });
                  setShowMapOverlay(false); // close the map after selecting a location
                }}
            />
            <Button onClick={() => setShowMapOverlay(false)}>Close Map</Button>
          </div>
      )}
    </Modal>
  );
}

export default AddChargerModel;
