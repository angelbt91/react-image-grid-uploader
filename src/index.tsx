import React, { useRef } from "react";

type onChange = (imageAsDataURL: string, position?: number) => void;

interface ImageGridUploaderProps {
  containerStyles?: React.CSSProperties;
  gridStyles?: React.CSSProperties;
  cellStyles?: React.CSSProperties;
  images?: number;
  columns?: number;
  mode?: "fluid" | "fixed";
  cellMinWidth?: string;
  onChange?: onChange;
}

interface ImageInputProps {
  position: number;
  cellStyles?: React.CSSProperties;
  onChange: onChange;
}

const ImageInput = ({ position, cellStyles, onChange }: ImageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = React.useState<string>();
  const defaultCellStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px dotted blue",
    height: "150px", // TODO try to make this dynamic based on widdth?
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const { result } = reader;
      if (typeof result !== "string") return;
      setImage(result);
      onChange(result, position);
    };
    reader.readAsDataURL(file); // TODO allow to format as other types
  };

  return (
    <div style={{ ...defaultCellStyles, ...cellStyles }}>
      <input type="file" ref={inputRef} style={{ display: "none" }} onChange={handleImageChange} />
      {image && (
        <img
          src={image}
          alt={`Image ${position + 1}`}
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
      )}
      {!image && <span onClick={() => inputRef.current && inputRef.current.click()}>+</span>}
    </div>
  );
};

// TODO add proptypes
// eslint-disable-next-line react/prop-types
const ImageGridUploader = ({
  containerStyles = {},
  gridStyles = {},
  cellStyles = {},
  images = 5,
  columns = 3,
  mode = "fixed",
  cellMinWidth = "150px",
  onChange = (image, position) => console.log({ position, image }),
}: ImageGridUploaderProps): JSX.Element => {
  // TODO add a way to read the values of all the cells from parent component
  const defaultGridStyles: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(
    ${mode === "fixed" ? columns : "auto-fit"},
    ${mode === "fixed" ? "1fr" : "minmax(" + cellMinWidth + ", 1fr)"}
    )`,
    gap: "15px",
  };

  return (
    <div style={containerStyles}>
      <div style={{ ...defaultGridStyles, ...gridStyles }}>
        {Array.from("_".repeat(images)).map((_, index) => (
          <ImageInput key={index} position={index} cellStyles={cellStyles} onChange={onChange} />
        ))}
      </div>
    </div>
  );
};

export default ImageGridUploader;
