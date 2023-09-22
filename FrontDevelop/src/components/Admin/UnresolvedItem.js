import { Col, Row } from "antd";
import "../../styles/Admin/unresolved_item.css";
import React from "react";

function UnresolvedItem(props) {
  return (
    <div className="unresolved-item">
      <Row>
        <Col span={4}>
          <img
            src={props.icon}
            alt="Icon"
            className="unresolved-item-img"
          ></img>
        </Col>
        <Col span={20}>
          <div className="unresolved-item-text">{props.text}</div>
        </Col>
      </Row>
    </div>
  );
}

export default UnresolvedItem;
