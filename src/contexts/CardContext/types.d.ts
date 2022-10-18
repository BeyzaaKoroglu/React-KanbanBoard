import { CardType } from "../../services/endpoints/card/types";
import { CommentType } from "../../services/endpoints/comment/types";
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
  addComment: (newComment: CommentType) => void;
  deleteComment: (id: number) => void;
};

export type StateType = {
  selectedCard: CardType;
};

export type NewValues = {
  title: string;
  description: string;
  duedate: Date | undefined;
};
