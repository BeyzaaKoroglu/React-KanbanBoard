export type CreateRequestPayload = {
  cardId: number;
  message: string;
};

export type CreateResponsePayload = {
  data: CommentType;
};

export type CommentType = {
  id: number;
  cardId: number;
  message: string;
  authorId: number;
  updatedAt: string;
  createdAt: string;
  author?: {
    id?: number;
    username: string;
    createdAt?: string;
    updatedAt?: string;
  };
};
