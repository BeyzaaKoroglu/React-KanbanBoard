export type RegisterRequestPayload = {
  username: string;
  password: string;
  passwordConfirm: string;
};

export type LoginRequestPayload = {
  username: string;
  password: string;
};
