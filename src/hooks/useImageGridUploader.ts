import { useState } from "react";
import { HandleOnChange, HandleDrag, Data } from "../types";

type UseImageGridUploader = {
  data: Data;
  register: () => {
    handleDrag: HandleDrag;
    data: Data;
    handleOnChange: HandleOnChange;
  };
};

export const useImageGridUploader = (): UseImageGridUploader => {
  const [data, setData] = useState<Data>([]);

  const register = () => {
    const handleOnChange: HandleOnChange = (newData, insertAtPosition, allowEmptyCells) => {
      setData((prev) => {
        const newState = [...prev];
        const newDataPosition = allowEmptyCells ? insertAtPosition : newState.length;
        newState[newDataPosition] = newData;
        return newState;
      });
    };

    const handleDrag: HandleDrag = (movedData, destinationPos, allowEmptyCells) => {
      // TODO implement properly
      setData((prev) => {
        const newState = [...prev];
        if (!allowEmptyCells) {
          const lastNonNullIndex = [...newState]
            .reverse()
            .findIndex((item) => item !== null && item !== undefined);
          if (lastNonNullIndex !== -1) destinationPos = lastNonNullIndex;
        }
        newState.splice(movedData.position, 1);
        if (newState.length < destinationPos) {
          for (let i = newState.length; i < destinationPos; i++) {
            newState.push({ position: i, imageURL: "" });
          }
        }

        // TODO why are images in movedData empty?
        newState.splice(destinationPos, 0, movedData);

        return newState;
      });
    };

    return { data, handleOnChange, handleDrag };
  };

  return { data, register };
};
