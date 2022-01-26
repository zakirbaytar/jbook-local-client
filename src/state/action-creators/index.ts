import { ActionType } from "../action-types";
import {
  MoveCellAction,
  InsertCellAfterAction,
  UpdateCellAction,
  DeleteCellAction,
  Direction,
} from "../actions";
import { CellType } from "../cell";

interface InsertCellAfterPayload {
  id?: string;
  type: CellType;
}

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MoveCell,
    payload: { id, direction },
  };
};

export const insertCellAfter = ({
  id,
  type,
}: InsertCellAfterPayload): InsertCellAfterAction => {
  return {
    type: ActionType.InsertCellAfter,
    payload: { id, type },
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UpdateCell,
    payload: { id, content },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DeleteCell,
    payload: { id },
  };
};
