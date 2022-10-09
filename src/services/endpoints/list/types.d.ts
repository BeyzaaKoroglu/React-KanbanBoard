export type ListsResponseType = {
  data: Array<{
    id: number;
    title: string;
    boardId: number;
    updatedAt: string;
    createdAt: string;
  }>;
};

export type CreateUpdateRequestPayload = {
  title: string;
  boardId: number;
};
