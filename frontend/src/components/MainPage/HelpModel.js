import React from "react";
import { Form, Input, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function HelpModel(props) {
  const handleOk = () => {};
  const { TextArea } = Input;

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Modal
      title="Appeal Form"
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
          label="Order Selection"
          name="select..."
          rules={[
            {
              required: true,
              message: "Select",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Problem Description: "
          name="problem..."
          rules={[
            {
              required: true,
              message: "Please type your question here...",
            },
          ]}
        >
          <TextArea rows={6} />
        </Form.Item>

        <Form.Item
          label="Evidence"
          name="eviden"
          rules={[
            {
              required: true,
              message: "Please describe your evidence here...",
            },
          ]}
        >
          <TextArea rows={6} />
        </Form.Item>

        <Form.Item
          label="Upload Any Evidence:"
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

export default HelpModel;
