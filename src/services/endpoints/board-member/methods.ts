import instance from "../../instance";
import { CreateRequestPayload } from "./types";

export const create = (payload: CreateRequestPayload) =>
  instance.post("board-member", payload);

export const destroy = (id: number) => instance.delete(`board-member/${id}`);
