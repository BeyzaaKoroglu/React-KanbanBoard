import { LabelType } from "../../services/endpoints/label/types";

export type ContextType = {
  state: StateType;
  setSelectedCard: (id: number) => void;
  updateSelectedCard: (newValues: NewValues) => void;
  addChecklist: (newChecklist: ChecklistType) => void;
  deleteChecklist: (checklistId: number) => void;
  updateChecklist: (newChecklist: ChecklistType) => void;
  addItem: (newItem: ItemType) => void;
  deleteItem: (checklistId: number, itemId: number) => void;
  updateItem: (newValues: ItemType) => void;
  addLabel: (newLabel: LabelType) => void;
  deleteLabel: (id: number) => void;
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
  checklists: Array<ChecklistType>;
  labels: Array<LabelType>;
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
  items?: Array<ItemType>;
};

export type ItemType = {
  id: number;
  checklistId: number;
  title: string;
  isChecked: boolean;
};
