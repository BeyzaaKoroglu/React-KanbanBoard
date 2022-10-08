import instance from "../../instance";
import {
  LoginRequestPayload,
  RegisterRequestPayload,
  UsersResponseType,
} from "./types";

export const register = (payload: RegisterRequestPayload) =>
  instance.post("auth/register", payload);

export const login = (payload: LoginRequestPayload) =>
  instance.post("auth/login", payload);

export const getUserList = (): Promise<UsersResponseType> =>
  instance.get("user");
