import React from "react";
import "./Forbidden.css";
import image403 from "../images/403.png";

function Forbidden() {
  // mensaje 403 prohibido
  return (
    <div className="Forbidden">
      <div>
        <img src={image403} alt="forbidden"></img>
      </div>
    </div>
  );
}

export default Forbidden;
