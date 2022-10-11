export type CreateRequestPayload = {
  title: string;
  listId: number;
};

export type CreateResponsePayload = {
  data: {
    id: number;
    title: string;
    listId: number;
    updatedAt: string;
    createdAt: string;
    description: string;
    duedate: Date | undefined;
  };
};

export type UpdateRequestPayload = {
  title?: string;
  description?: string;
  duedate?: Date | string;
  order?: number;
};
