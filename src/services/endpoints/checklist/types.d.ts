import { ChecklistItemType } from "../checklist-item/types";

export type CreateRequestPayload = {
  title: string;
  cardId: number;
};

export type CreateResponsePayload = {
  data: ChecklistType;
};

export type ChecklistType = {
  id: number;
  cardId: number;
  title: string;
  items: Array<ChecklistItemType>;
};

export type UpdateRequestPayload = {
  title: string;
};
