export type CreateRequestPayload = {
  checklistId: number;
  title: string;
  isChecked: boolean;
};

export type CreateResponsePayload = {
  data: ChecklistItemType;
};

export type UpdateRequestPayload = {
  title?: string;
  isChecked?: boolean;
};

export type ChecklistItemType = {
  id: number;
  checklistId: number;
  title: string;
  isChecked: boolean;
};
