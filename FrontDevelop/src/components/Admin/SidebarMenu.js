import { Col, Row } from "antd";
import "../../styles/Admin/sidebar_menu.css";
import React, { useState } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";

function SidebarMenu(props) {
  const [focused, setFocused] = useState(false);

  const setFocus = () => {
    setFocused(true);
  };

  const removeFocus = () => {
    setFocused(false);
  };

  return (
    <div
      className="sidebar-menu-item"
      tabIndex="0"
      style={{
        backgroundColor: focused ? "rgb(60,141,146)" : "brown",
        userSelect: "none",
      }}
      onFocus={setFocus}
      onBlur={removeFocus}
      onClick={() => props.childClick(props.title)}
    >
      <Row>
        <Col span={16}>
          <div className="sidebar-menu-item-title">{props.title}</div>
        </Col>
        <Col span={4}>
          <div className="circle-div">{props.number}</div>
        </Col>
        <Col span={4}>
          <ArrowRightOutlined
            style={{ marginTop: "20px" }}
          ></ArrowRightOutlined>
        </Col>
      </Row>
    </div>
  );
}

export default SidebarMenu;
