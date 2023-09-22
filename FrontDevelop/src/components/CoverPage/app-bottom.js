import "../../styles/CoverPage/app-bottom.css";
import React from "react";
import { Button } from "antd";


function AppBottom() {
  return (
    <div className={"bottom-content"}>
      <div className={"title-content"}>There is always one that suits you</div>
      <Button style={{ marginTop: "10px" }} shape={"round"}>
        {" "}
        Sign up now !{" "}
      </Button>
    </div>
  );
}

export default AppBottom;
