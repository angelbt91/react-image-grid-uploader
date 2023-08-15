import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ImageInput from "../ImageInput";
import { Data, HandleDrag, HandleOnChange, OnChange } from "../../types";

interface ImageGridUploaderProps {
  containerStyles?: React.CSSProperties;
  gridStyles?: React.CSSProperties;
  cellStyles?: React.CSSProperties;
  images?: number;
  columns?: number;
  mode?: "fluid" | "fixed";
  cellMinWidth?: string;
  onChange?: OnChange;
  data: Data;
  handleOnChange: HandleOnChange;
  handleDrag: HandleDrag;
  allowEmptyCells?: boolean;
}

// TODO add proptypes
const ImageGridUploader = ({
  containerStyles = {},
  gridStyles = {},
  cellStyles = {},
  images = 5,
  columns = 3,
  mode = "fixed",
  cellMinWidth = "150px",
  onChange,
  data,
  handleOnChange,
  handleDrag,
  allowEmptyCells = false,
}: ImageGridUploaderProps): JSX.Element => {
  const defaultGridStyles: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(
    ${mode === "fixed" ? columns : "auto-fit"},
    ${mode === "fixed" ? "1fr" : "minmax(" + cellMinWidth + ", 1fr)"}
    )`,
    gap: "15px",
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={containerStyles}>
        <div style={{ ...defaultGridStyles, ...gridStyles }}>
          {Array.from("_".repeat(images)).map((_, index) => {
            return (
              <ImageInput
                key={index}
                item={data[index] || { position: index }}
                cellStyles={cellStyles}
                handleOnChange={handleOnChange}
                handleDrag={handleDrag}
                onChange={onChange}
                allowEmptyCells={allowEmptyCells}
              />
            );
          })}
        </div>
      </div>
    </DndProvider>
  );
};

export default ImageGridUploader;
