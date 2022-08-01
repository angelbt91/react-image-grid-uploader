import React from "react";
import * as CSS from "csstype";

interface Props {
  name: string;
  boxStyles: CSS.Properties;
}

const ImageGridUploader = ({ name, boxStyles }: Props): JSX.Element => {
  return <div style={boxStyles}>Hey {name}, say hello to TypeScript.</div>;
};

export default ImageGridUploader;
