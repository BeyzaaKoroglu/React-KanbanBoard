export type ListsResponseType = {
  data: Array<{
    id: number;
    title: string;
    boardId: number;
    updatedAt: string;
    createdAt: string;
  }>;
};

export type CreateRequestPayload = {
  title: string;
  boardId: number;
};

export type UpdateRequestPayload = {
  title?: string;
  order?: number;
};
