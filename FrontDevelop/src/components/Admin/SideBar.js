import "../../styles/Admin/Sidebar.css";
import React from "react";
import SidebarMenu from "./SidebarMenu";

function Sidebar(props) {
  return (
    <div className="side-bar">
      <SidebarMenu
        childClick={props.childClick}
        title="Unresolved cases"
        number="10"
      />
      <SidebarMenu
        childClick={props.childClick}
        title="New users"
        number="10"
      />
      <SidebarMenu childClick={props.childClick} title="Accounts" number="10" />
      <SidebarMenu childClick={props.childClick} title="Finance" number="10" />
      <SidebarMenu childClick={props.childClick} title="Activity" number="10" />
    </div>
  );
}

export default Sidebar;
