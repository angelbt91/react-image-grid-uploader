import React, { useRef } from "react";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { HandleDrag, HandleOnChange, InputData, OnChange } from "../../types";

interface ImageInputProps {
  item: InputData;
  cellStyles?: React.CSSProperties;
  onChange?: OnChange;
  handleOnChange: HandleOnChange;
  handleDrag: HandleDrag;
  allowEmptyCells: boolean;
}

export const defaultCellStyles: React.CSSProperties = {
  position: "relative",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px dotted blue",
  height: "150px", // TODO try to make this dynamic based on width?
};

// TODO consider memoizing based on imageURL
const ImageInput: React.FC<ImageInputProps> = ({
  item,
  cellStyles,
  onChange,
  handleOnChange,
  handleDrag,
  allowEmptyCells,
}) => {
  const {
    isDragging,
    drag,
    isOverLeft,
    canDropLeft,
    dropLeft,
    isOverRight,
    canDropRight,
    dropRight,
  } = useDragAndDrop(item, handleDrag, allowEmptyCells);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const { result } = reader;
      if (typeof result !== "string") return;
      handleOnChange({ imageURL: result, position: item.position }, item.position, allowEmptyCells);
      if (onChange) onChange(result, item.position);
    };
    reader.readAsDataURL(file); // TODO allow to format as other types
  };

  return (
    <div style={{ ...defaultCellStyles, ...cellStyles }} ref={item.imageURL ? drag : null}>
      <div style={{ position: "absolute", height: "100%", width: "100%", display: "flex" }}>
        <span
          style={{
            position: "relative",
            width: "50%",
            height: "100%",
            backgroundColor: isOverLeft && canDropLeft ? "yellow" : "rgba(0, 0, 0, 0)", // TODO allow set drop styles
          }}
          ref={dropLeft}
          onClick={() => inputRef.current && inputRef.current.click()}
        />
        <span
          style={{
            position: "relative",
            width: "50%",
            height: "100%",
            backgroundColor: isOverRight && canDropRight ? "yellow" : "rgba(0, 0, 0, 0)", // TODO allow set drop styles
          }}
          ref={dropRight}
          onClick={() => inputRef.current && inputRef.current.click()}
        />
      </div>
      <input type="file" ref={inputRef} style={{ display: "none" }} onChange={handleImageChange} />
      {item.imageURL && (
        <img
          src={item.imageURL}
          alt={`Image ${item.position + 1}`}
          style={{ maxHeight: "100%", maxWidth: "100%", opacity: isDragging ? 0.5 : 1 }}
        />
      )}
      {!item.imageURL && (
        <>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            +
          </span>
        </>
      )}
    </div>
  );
};

export default ImageInput;
