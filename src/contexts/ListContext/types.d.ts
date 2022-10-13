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

export type ListType = {
  id: number;
  title: string;
  boardId: number;
  updatedAt: string;
  createdAt: string;
  cards: Array<CardType>;
};

export type CardType = {
  id: number;
  title: string;
  listId: number;
  updatedAt: string;
  createdAt: string;
  description: string;
  duedate: Date | undefined;
  checklists?: Array<any>;
};

export type DestinationSourceType = {
  index: number;
  droppableId: string;
};
