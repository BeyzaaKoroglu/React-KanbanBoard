import { CardType } from "../card/types";

export type CreateResponseType = {
  data: Array<ListType>;
};

export type ListType = {
  id: number;
  title: string;
  boardId: number;
  cards: Array<CardType>;
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
