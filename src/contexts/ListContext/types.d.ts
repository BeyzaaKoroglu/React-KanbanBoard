export type ContextType = {
  state: StateType;
  addList: (newList: ListType) => void;
  deleteList: (id: number) => void;
  updateList: (newValues: ListType) => void;
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
};
