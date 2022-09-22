import React from "react";
import DefaultImageInput from "./components/DefaultImageInput";
import { ImageInput } from "./types/ImageInput";

interface Props {
  onChange?: () => void;
  containerStyles?: React.CSSProperties;
  ImageInput?: ImageInput;
  images?: number;
  columns?: number;
}

const ImageGridUploader = ({
  containerStyles = {},
  ImageInput = DefaultImageInput,
  images = 1,
  columns = 6,
}: Props): JSX.Element => {
  const cellWidth = 100 / (columns + 1);
  const emptyCells = Math.ceil(images / columns) * columns - images;

  return (
    <div style={containerStyles}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
        {Array.from("_".repeat(images)).map((_, index) => (
          <ImageInput key={index} width={cellWidth} />
        ))}
        {Array.from("_".repeat(emptyCells)).map((_, index) => (
          <div key={index} style={{ flexBasis: `${cellWidth}%`, border: "1px dotted blue" }}></div>
        ))}
      </div>
    </div>
  );
};

export default ImageGridUploader;
