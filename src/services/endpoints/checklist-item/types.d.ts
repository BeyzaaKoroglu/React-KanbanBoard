export type CreateRequestPayload = {
  checklistId: number;
  title: string;
  isChecked: boolean;
};

export type UpdateRequestPayload = {
  title?: string;
  isChecked?: boolean;
};
