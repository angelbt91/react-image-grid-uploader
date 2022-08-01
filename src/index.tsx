import React from "react";

interface Props {
  name: string;
  boxStyles: React.CSSProperties;
}

const ImageGridUploader = ({ name, boxStyles }: Props): JSX.Element => {
  return <div style={boxStyles}>Hey {name}, say hello to TypeScript.</div>;
};

export default ImageGridUploader;
