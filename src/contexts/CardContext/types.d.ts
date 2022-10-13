export type ContextType = {
  state: StateType;
  setSelectedCard: (id: number) => void;
  updateSelectedCard: (newValues: NewValues) => void;
  addChecklist: (newChecklist: ChecklistType) => void;
  deleteChecklist: (checklistId: number) => void;
  updateChecklist: (newChecklist: ChecklistType) => void;
};

export type StateType = {
  selectedCard: CardType;
};

export type CardType = {
  id: number;
  title: string;
  listId: number;
  updatedAt: string;
  createdAt: string;
  description: string;
  duedate: Date | undefined;
  checklists: Array<checklist>;
};

export type NewValues = {
  title: string;
  description: string;
  duedate: Date | undefined;
};

export type ChecklistType = {
  id: number;
  cardId: number;
  title: string;
  updatedAt: string;
  createdAt: string;
};
