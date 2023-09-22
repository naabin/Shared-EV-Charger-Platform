import { Col, Row, Input } from "antd";
import "../../styles/Admin/HeadBar.css";
import React from "react";
import { LogoutOutlined, WifiOutlined } from "@ant-design/icons";

function Headbar() {
  return (
    <div className="container-headbar">
      <Row className="head-row">
        <Col span={12}>
          <WifiOutlined
            style={{ height: "40px", marginTop: "10px", marginLeft: "50px" }}
          />
        </Col>
        <Col span={8}>
          <Input className="round-input" placeholder="search..." />
        </Col>
        <Col span={4}>
          <LogoutOutlined
            style={{ height: "40px", marginTop: "10px", marginLeft: "50px" }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Headbar;
