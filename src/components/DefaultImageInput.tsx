import React from "react";
import { ImageInput } from "../types/ImageInput";

// TODO add proptypes
// eslint-disable-next-line react/prop-types
const DefaultImageInput: ImageInput = ({ width }) => {
  return (
    <div style={{ flexBasis: `${width}%`, border: "1px dotted blue" }}>
      <p style={{ textAlign: "center" }}>- Image -</p>
    </div>
  );
};

export default DefaultImageInput;
