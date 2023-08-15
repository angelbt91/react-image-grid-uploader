import React from "react";
import ImageGridUploader, { useImageGridUploader } from "react-image-grid-uploader";

const App = (): JSX.Element => {
  const { register } = useImageGridUploader();

  return (
    <ImageGridUploader
      containerStyles={{ border: "1px solid red" }}
      images={27}
      columns={4}
      allowEmptyCells={true}
      {...register()}
    />
  );
};

export default App;
