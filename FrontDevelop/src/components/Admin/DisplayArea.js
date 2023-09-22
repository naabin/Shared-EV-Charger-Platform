import "../../styles/Admin/DisplayArea.css";
import React from "react";
import Unresolved from "./Unsolved";
import NewUsers from "./NewUsers";

function DisplayArea(props) {
  if (props.content === "Unresolved cases") {
    return (
      <div className="display-area">
        <Unresolved />
      </div>
    );
  } else if (props.content === "New users") {
    return (
      <div className="display-area">
        <NewUsers />
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default DisplayArea;
