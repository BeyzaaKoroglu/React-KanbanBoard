export type CreateRequestPayload = {
  title: string;
  cardId: number;
};

export type CreateResponsePayload = {
  data: {
    id: number;
    cardId: number;
    title: string;
    updatedAt: string;
    createdAt: string;
  };
};

export type UpdateRequestPayload = {
  title: string;
};
