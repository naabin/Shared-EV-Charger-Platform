import "../../styles/Admin/AdminPage.css";
import React, { useState } from "react";
import HeadBar from "./HeadBar";
import { Col, Row } from "antd";
import SideBar from "./SideBar";
import DisplayArea from "./DisplayArea";
function AdminPage() {
  const [currentContent, setCurrentContent] = useState("Unresolved cases");

  const updateContent = (content) => {
    setCurrentContent(content);
  };

  return (
    <div>
      <HeadBar />
      <div className="main-content">
        <Row style={{ height: "50vh" }}>
          <Col span={8}>
            <SideBar childClick={updateContent} />
          </Col>
          <Col span={16}>
            <DisplayArea content={currentContent} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AdminPage;
