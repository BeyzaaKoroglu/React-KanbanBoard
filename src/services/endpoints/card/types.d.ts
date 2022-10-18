import { ChecklistType } from "../checklist/types";
import { LabelType } from "../label/types";

export type CreateRequestPayload = {
  title: string;
  listId: number;
  order: number;
};

export type CreateResponsePayload = {
  data: CardType;
};

export type CardType = {
  id: number;
  title: string;
  listId: number;
  description: string;
  duedate: Date | undefined;
  order: number;
  checklists: Array<ChecklistType>;
  labels: Array<LabelType>;
  comments: Array<CommentType>;
};

export type UpdateRequestPayload = {
  title?: string;
  description?: string;
  duedate?: Date | string;
  order?: number;
  listId?: number;
};
