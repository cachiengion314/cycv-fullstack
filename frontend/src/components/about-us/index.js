import React from "react";
import Text from "../../custom-components/Text";
import Vars from "../other-stuffs/Vars";
import "./index.css";

const index = ({ width, className }) => {
  const image = "https://res.cloudinary.com/cachiengion314/image/upload/v1619718969/cv-image_jhl0qo.png"
  return (
    <div style={{ width: width, padding: "0 2rem" }} className={className}>
      <Text width="100%" textAlign="center" className="mt-5 mb-2">Trang web này thuộc về cachiengion314</Text>
      <div className={`about-us-container ${className}`}>
        <div style={{ width: "100%" }} className="align-center">
          <img src={image} className="cycv-image me-3" alt="about-us"></img>
        </div>
      </div>
    </div>
  )
}

export default index