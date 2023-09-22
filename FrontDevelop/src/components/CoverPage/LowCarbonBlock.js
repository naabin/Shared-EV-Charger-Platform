import "../../styles/CoverPage/LowCarbonBlock.css";
import React from "react";
import Img1 from "../../matirial/Image/part3-1.png";
import Img2 from "../../matirial/Image/part3-2.png";
import Img3 from "../../matirial/Image/part3-3.png";
import { Col, Row } from "antd";

function LowCarbonBlock() {
  return (
    <div className={"block-content"}>
      <div className={"block-title"}>contribute to low-carbon travel</div>
      <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
        <Row>
          <Col span={8}>
            <div>
              <img width={"50%"} src={Img1} alt="1" />
            </div>
          </Col>
          <Col span={8}>
            <div>
              <img width={"50%"} src={Img2} alt="2" />
            </div>
          </Col>
          <Col span={8}>
            <div>
              <img width={"50%"} src={Img3} alt="3" />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default LowCarbonBlock;
