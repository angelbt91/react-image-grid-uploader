import React, { useRef } from "react";
import { ImageInput } from "../types/ImageInput";

// TODO add proptypes
// eslint-disable-next-line react/prop-types
const DefaultImageInput: ImageInput = ({ width }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div style={{ flexBasis: `${width}%`, border: "1px dotted blue" }}>
      <input type="file" ref={inputRef} />
      <div>
        <img src="" alt="Image" />
        <span>+</span>
      </div>
    </div>
  );
};

export default DefaultImageInput;
