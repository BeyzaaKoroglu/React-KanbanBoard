export type BoardListResponseType = {
  data: Array<BoardType>;
};

export type BoardType = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  ownerId: 5;
  members: Array<any>;
};

export type BoardResponseType = {
  data: BoardType;
};

export type CreateUpdateBoardRequestPayload = {
  title: string;
};
