export type ListsResponseType = {
  data: Array<{
    id: number;
    title: string;
    boardId: number;
    updatedAt: string;
    createdAt: string;
    cards: Array<Any>;
  }>;
};

export type CreateRequestPayload = {
  title: string;
  boardId: number;
  order: number;
};

export type UpdateRequestPayload = {
  title?: string;
  order?: number;
};
