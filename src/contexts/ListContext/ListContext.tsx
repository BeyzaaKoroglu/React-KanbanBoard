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
import { CardType, ContextType, ListType, StateType } from "./types";
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
  addCard: () => {},
  deleteCard: () => {},
  updateCard: () => {},
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

  const addCard = (listId: number, newCard: CardType) => {
    setState({
      lists: state.lists.map((list) => {
        if (list.id === listId) {
          if (list.cards) list.cards = [...list.cards, newCard];
          else list.cards = [newCard];
        }
        return list;
      }),
    });
  };

  const deleteCard = (listId: number, cardId: number) => {
    setState({
      lists: state.lists.map((list) => {
        if (list.id === listId)
          list.cards = list.cards.filter((card) => card.id !== cardId);
        return list;
      }),
    });
  };

  const updateCard = (newValues: CardType) => {
    setState({
      lists: state.lists.map((list) => {
        if (list.id === newValues.listId) {
          list.cards = list.cards.map((card) => {
            if (card.id === newValues.id) return newValues;
            return card;
          });
        }
        return list;
      }),
    });
  };

  const values = {
    state,
    addList,
    deleteList,
    updateList,
    DragDropList,
    addCard,
    deleteCard,
    updateCard,
  };
  return <ListContext.Provider value={values}>{children}</ListContext.Provider>;
};

export const useListContext = () => {
  const {
    state,
    addList,
    deleteList,
    updateList,
    DragDropList,
    addCard,
    deleteCard,
    updateCard,
  } = useContext(ListContext);
  return {
    lists: state.lists,
    addList,
    deleteList,
    updateList,
    DragDropList,
    addCard,
    deleteCard,
    updateCard,
  };
};
