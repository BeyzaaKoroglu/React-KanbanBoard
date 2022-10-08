export type RegisterRequestPayload = {
  username: string;
  password: string;
  passwordConfirm: string;
};

export type LoginRequestPayload = {
  username: string;
  password: string;
};

export type UsersResponseType = {
  data: Array<{
    id: number;
    username: string;
    createdAt: string;
    updatedAt: string;
  }>;
};
