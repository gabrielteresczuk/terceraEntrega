import React from "react";
import "./Forbidden.css";
import image404 from "../images/404.png";

function Forbidden() {
  // mensaje 403 prohibido
  return (
    <div className="Forbidden">
      <div>
        <img src={image404} alt="forbidden"></img>
      </div>
    </div>
  );
}

export default Forbidden;
