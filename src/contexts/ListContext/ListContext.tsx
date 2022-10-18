import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useBoardContext } from "../BoardContext/BoardContext";
import { ContextType, DestinationSourceType, StateType } from "./types";
import { list as listServices } from "../../services/endpoints/list";
import { card as cardService } from "../../services/endpoints/card";
import { ListType } from "../../services/endpoints/list/types";
import { CardType } from "../../services/endpoints/card/types";

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
  DragDropCard: () => {},
});

export const ListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<StateType>(initialState);
  const { selectedBoard } = useBoardContext();

  useEffect(() => {
    listServices.getList(selectedBoard.id).then(({ data }) => {
      const lists = data.map((list) => {
        list.cards.sort(function (a, b) {
          return a.order - b.order;
        });
        return list;
      });
      setState({ ...state, lists: lists });
    });
  }, [selectedBoard]);

  const addList = (newList: ListType) => {
    newList = { ...newList, cards: [] };
    setState({ ...state, lists: [...state.lists, newList] });
  };

  const deleteList = (id: number) => {
    setState({ ...state, lists: state.lists.filter((list) => list.id !== id) });
  };

  const updateList = (newValues: ListType) => {
    setState({
      ...state,
      lists: state.lists.map((item) => {
        if (item.id === newValues.id) item = { ...item, ...newValues };
        return item;
      }),
    });
  };

  const DragDropList = (destination: number, source: number) => {
    const list = state.lists.splice(source, 1);
    const newLists = [...state.lists];
    newLists.splice(destination, 0, list[0]);
    newLists.forEach((list, index) => {
      listServices.update(list.id, { order: index });
    });
    setState({ ...state, lists: newLists });
  };

  const addCard = (listId: number, newCard: CardType) => {
    setState({
      ...state,
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
      ...state,
      lists: state.lists.map((list) => {
        if (list.id === listId)
          list.cards = list.cards.filter((card) => card.id !== cardId);
        return list;
      }),
    });
  };

  const updateCard = (newValues: CardType) => {
    setState({
      ...state,
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

  const DragDropCard = (
    destination: DestinationSourceType,
    source: DestinationSourceType
  ) => {
    const sourceId = Number(source.droppableId);
    const destinationId = Number(destination.droppableId);

    const newLists = [...state.lists];
    const sourceList = newLists.find((list) => list.id === sourceId);
    const destinationList = newLists.find((list) => list.id === destinationId);

    if (sourceList && destinationList) {
      const card = sourceList.cards.splice(source.index, 1)[0];
      destinationList.cards.splice(destination.index, 0, card);

      setState({ ...state, lists: newLists });

      cardService.update(card.id, { listId: destinationId }).then(() => {
        destinationList.cards.forEach((card, index) => {
          cardService.update(card.id, { order: index });
        });
        sourceList.cards.forEach((card, index) => {
          cardService.update(card.id, { order: index });
        });
      });
    }
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
    DragDropCard,
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
    DragDropCard,
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
    DragDropCard,
  };
};
