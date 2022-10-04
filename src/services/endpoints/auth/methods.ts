import instance from "../../instance";
import { LoginRequestPayload, RegisterRequestPayload } from "./types";

export const register = (payload: RegisterRequestPayload) =>
  instance.post("auth/register", payload);

export const login = (payload: LoginRequestPayload) =>
  instance.post("auth/login", payload);
