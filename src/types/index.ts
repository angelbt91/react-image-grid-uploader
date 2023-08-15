export type OnChange = (imageAsDataURL: string, position?: number) => void;

export type InputData = {
  position: number;
  imageURL?: string;
};

export type Data = Array<InputData | undefined>;

export type HandleOnChange = (
  newData: InputData,
  insertAtPosition: number,
  allowEmptyCells: boolean
) => void;

export type HandleDrag = (
  movedData: InputData,
  destinationPos: number,
  allowEmptyCells: boolean
) => void;
