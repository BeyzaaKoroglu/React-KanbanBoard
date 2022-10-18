import { UserType } from "../auth/types";

export type BoardListResponseType = {
  data: Array<BoardType>;
};

export type BoardType = {
  id: number;
  title: string;
  ownerId: number;
  members: Array<UserType>;
};

export type BoardResponseType = {
  data: BoardType;
};

export type CreateUpdateBoardRequestPayload = {
  title: string;
};
