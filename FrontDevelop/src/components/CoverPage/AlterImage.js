import "../../styles/CoverPage/AlterImage.css";
import React, { useState } from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function AlterImage(props) {
  const [isHovered, setIsHovered] = useState(false);

  const overlayButtonHovering = () => {
    setIsHovered(true);
  };

  const overlayButtonNormal = () => {
    setIsHovered(false);
  };

  const dynamicStyle = isHovered ? { display: "block" } : { opacity: "0" };

  const btnStyle = props.btnShow ? { display: "block" } : { display: "none" };

  return (
    <div className={"flex-img-container"}>
      <div className="btn-image-container">
        <Button
          size={"small"}
          style={btnStyle}
          className="overlay-button"
          shape="round"
          icon={<SearchOutlined />}
          onMouseEnter={overlayButtonHovering}
          onMouseLeave={overlayButtonNormal}
        >
          {props.btnText}
        </Button>
        <img style={{ width: "100%" }} src={props.leftImage} alt="Left " />
      </div>
      <div className="hidden-image-container" style={dynamicStyle}>
        <img style={{ width: "100%" }} src={props.rightImage} alt="Right " />
      </div>
    </div>
  );
}

export default AlterImage;
