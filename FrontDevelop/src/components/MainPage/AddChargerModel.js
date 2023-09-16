import React from "react";
import { Form, Input, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function AddChargerModel(props) {
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
    </Modal>
  );
}

export default AddChargerModel;
