import React from "react";
import ImageGridUploader from "react-image-grid-uploader";

const App = (): JSX.Element => {
  return (
    <ImageGridUploader containerStyles={{ border: "1px solid red" }} images={27} columns={4} />
  );
};

export default App;
