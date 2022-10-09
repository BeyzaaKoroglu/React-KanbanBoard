import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { list } from "../../services/endpoints/list";
import { useBoardContext } from "../BoardContext/BoardContext";
import { ContextType, ListType, StateType } from "./types";

const initialState: StateType = {
  lists: [],
};

export const ListContext = createContext<ContextType>({
  state: initialState,
  addList: () => {},
  deleteList: () => {},
  updateList: () => {},
});

export const ListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<StateType>(initialState);
  const { selectedBoard } = useBoardContext();

  useEffect(() => {
    list.getList(selectedBoard.id).then(({ data }) => {
      setState({
        lists: data,
      });
    });
  }, [selectedBoard]);

  const addList = (newList: ListType) => {
    setState({ lists: [...state.lists, newList] });
  };

  const deleteList = (id: number) => {
    setState({
      lists: state.lists.filter((list) => list.id !== id),
    });
  };

  const updateList = (newValues: ListType) => {
    setState({
      lists: state.lists.map((item) => {
        if (item.id === newValues.id) return newValues;
        return item;
      }),
    });
  };

  const values = {
    state,
    addList,
    deleteList,
    updateList,
  };
  return <ListContext.Provider value={values}>{children}</ListContext.Provider>;
};

export const useListContext = () => {
  const { state, addList, deleteList, updateList } = useContext(ListContext);
  return {
    lists: state.lists,
    addList,
    deleteList,
    updateList,
  };
};
