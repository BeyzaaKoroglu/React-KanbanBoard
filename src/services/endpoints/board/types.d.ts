export type BoardListResponseType = {
  data: Array<{
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    ownerId: 5;
    members: Array<any>;
  }>;
};

export type BoardResponseType = {
  data: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    ownerId: 5;
    members: Array<any>;
  };
};

export type CreateUpdateBoardRequestPayload = {
  title: string;
};
