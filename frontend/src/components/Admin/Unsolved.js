import React from "react";
import UnresolvedItem from "./UnresolvedItem";
import logo from "../../matirial/Image/warning.png";

function Unresolved() {
  return (
    <div>
      <UnresolvedItem
        text="David's documents need manual review"
        icon={logo}
      ></UnresolvedItem>
    </div>
  );
}

export default Unresolved;
