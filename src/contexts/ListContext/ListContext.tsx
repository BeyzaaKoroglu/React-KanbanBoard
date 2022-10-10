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
import { list as listServices } from "../../services/endpoints/list";

const initialState: StateType = {
  lists: [],
};

export const ListContext = createContext<ContextType>({
  state: initialState,
  addList: () => {},
  deleteList: () => {},
  updateList: () => {},
  DragDropList: () => {},
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

  const DragDropList = (destination: number, source: number) => {
    const list = state.lists.splice(source, 1);
    const newLists = [...state.lists];
    newLists.splice(destination, 0, list[0]);
    newLists.map((list, index) => {
      listServices.update(list.id, { order: index });
    });
    setState({ lists: newLists });
  };

  const values = {
    state,
    addList,
    deleteList,
    updateList,
    DragDropList,
  };
  return <ListContext.Provider value={values}>{children}</ListContext.Provider>;
};

export const useListContext = () => {
  const { state, addList, deleteList, updateList, DragDropList } =
    useContext(ListContext);
  return {
    lists: state.lists,
    addList,
    deleteList,
    updateList,
    DragDropList,
  };
};
