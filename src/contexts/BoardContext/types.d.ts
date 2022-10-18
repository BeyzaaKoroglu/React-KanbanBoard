import { BoardType } from "../../services/endpoints/board/types";

export type ContextType = {
  state: StateType;
  addBoard: (newBoard: BoardType) => void;
  setSelectedBoard: (id: number) => void;
  updateBoard: (BoardType) => void;
  deleteBoard: (id: number) => void;
};

export type StateType = {
  boards: Array<BoardType>;
  selectedBoard: BoardType;
};
