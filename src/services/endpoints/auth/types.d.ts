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
  data: Array<UserType>;
};

export type UserType = {
  id: number;
  username: string;
  BoardMember?: {
    id: number;
  };
};
