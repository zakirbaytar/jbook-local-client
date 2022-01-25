import { ActionType } from "../action-types";
import {
  MoveCellAction,
  InsertCellBeforeAction,
  InsertCellAfterAction,
  UpdateCellAction,
  DeleteCellAction,
  Direction,
} from "../actions";
import { CellType } from "../cell";

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MoveCell,
    payload: { id, direction },
  };
};

export const insertCellBefore = (
  id: string,
  cellType: CellType
): InsertCellBeforeAction => {
  return {
    type: ActionType.InsertCellBefore,
    payload: { id, type: cellType },
  };
};

export const insertCellAfter = (
  id: string,
  cellType: CellType
): InsertCellAfterAction => {
  return {
    type: ActionType.InsertCellAfter,
    payload: { id, type: cellType },
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
