import { useDrag, useDrop } from "react-dnd";
import { HandleDrag, InputData } from "../types";

export const useDragAndDrop = (
  item: InputData,
  handleDrag: HandleDrag,
  allowEmptyCells: boolean
) => {
  const ITEM_TYPE_IMAGE = "image";
  const { position } = item;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE_IMAGE,
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOverLeft, canDropLeft }, dropLeft] = useDrop(
    () => ({
      accept: ITEM_TYPE_IMAGE,
      drop: (droppedItem: InputData) => {
        handleDrag(droppedItem, position === 0 ? 0 : position - 1, allowEmptyCells);
      },
      canDrop: (draggedItem: InputData) => draggedItem.position !== position,
      collect: (monitor) => ({
        canDropLeft: monitor.canDrop(),
        isOverLeft: monitor.isOver(),
      }),
    }),
    [position]
  );

  const [{ isOverRight, canDropRight }, dropRight] = useDrop(
    () => ({
      accept: ITEM_TYPE_IMAGE,
      drop: (droppedItem: InputData) => {
        handleDrag(droppedItem, position === 0 ? 1 : position, allowEmptyCells);
      },
      canDrop: (draggedItem: InputData) => draggedItem.position !== position,
      collect: (monitor) => ({
        canDropRight: monitor.canDrop(),
        isOverRight: monitor.isOver(),
      }),
    }),
    [position]
  );

  return {
    drag,
    isDragging,
    dropLeft,
    dropRight,
    canDropLeft,
    canDropRight,
    isOverLeft,
    isOverRight,
  };
};
