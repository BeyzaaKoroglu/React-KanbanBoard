import { ListType } from "../../services/endpoints/list/types";

export type ContextType = {
  state: StateType;
  addList: (newList: ListType) => void;
  deleteList: (id: number) => void;
  updateList: (newValues: ListType) => void;
  DragDropList: (destination: number, source: number) => void;
  addCard: (listId: number, newCard: CardType) => void;
  deleteCard: (listId: number, cardId: number) => void;
  updateCard: (newValues: CardType) => void;
  DragDropCard: (
    destination: DestinationSourceType,
    source: DestinationSourceType
  ) => void;
};

export type StateType = {
  lists: Array<ListType>;
};

export type DestinationSourceType = {
  index: number;
  droppableId: string;
};
