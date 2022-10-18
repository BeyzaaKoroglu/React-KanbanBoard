import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { board } from "../../services/endpoints/board";
import { BoardType } from "../../services/endpoints/board/types";
import { ContextType, StateType } from "./types";

const initialState: StateType = {
  boards: [],
  selectedBoard: {
    id: -1,
    title: "",
    ownerId: -1,
    members: [],
  },
};

export const BoardContext = createContext<ContextType>({
  state: initialState,
  addBoard: () => {},
  setSelectedBoard: () => {},
  updateBoard: () => {},
  deleteBoard: () => {},
});

export const BoardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<StateType>(initialState);

  useEffect(() => {
    board.getList().then((data) => {
      setState({
        ...initialState,
        boards: data.data,
      });
    });
  }, []);

  const addBoard = (newBoard: BoardType) => {
    setState({ ...state, boards: [...state.boards, newBoard] });
  };

  const setSelectedBoard = (boardId: number) => {
    let board = state.boards.find((item) => item.id === boardId);
    if (board)
      setState({
        ...state,
        selectedBoard: board,
      });
  };

  const updateBoard = (newValues: BoardType) => {
    let boards = state.boards.map((item) => {
      if (item.id === newValues.id) return newValues;
      return item;
    });

    setState({
      ...state,
      boards: boards,
    });
  };

  const deleteBoard = (id: number) => {
    let boards = state.boards.filter((item) => item.id !== id);
    setState({
      ...state,
      boards: boards,
    });
  };

  const values = {
    state,
    addBoard,
    setSelectedBoard,
    updateBoard,
    deleteBoard,
  };
  return (
    <BoardContext.Provider value={values}>{children}</BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const { state, addBoard, setSelectedBoard, updateBoard, deleteBoard } =
    useContext(BoardContext);
  return {
    boards: state.boards,
    selectedBoard: state.selectedBoard,
    addBoard,
    setSelectedBoard,
    updateBoard,
    deleteBoard,
  };
};
