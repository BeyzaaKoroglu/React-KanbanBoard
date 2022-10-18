import { UserType } from "../auth/types";

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
  author?: UserType;
};
