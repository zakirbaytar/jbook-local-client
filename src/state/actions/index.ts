import { ActionType } from "../action-types";
import { CellType } from "../cell";

export type Direction = "up" | "down";

export interface MoveCellAction {
  type: ActionType.MoveCell;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface InsertCellAfterAction {
  type: ActionType.InsertCellAfter;
  payload: { id?: string; type: CellType };
}

export interface UpdateCellAction {
  type: ActionType.UpdateCell;
  payload: { id: string; content: string };
}

export interface DeleteCellAction {
  type: ActionType.DeleteCell;
  payload: {
    id: string;
  };
}

export type Action =
  | MoveCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | DeleteCellAction;