import instance from "../../instance";
import {
  BoardResponseType,
  BoardListResponseType,
  CreateUpdateBoardRequestPayload,
} from "./types";

export const getList = (): Promise<BoardListResponseType> =>
  instance.get("board");

export const getById = (id: number): Promise<BoardResponseType> =>
  instance.get(`board/${id}`);

export const create = (payload: CreateUpdateBoardRequestPayload) =>
  instance.post("board", payload);

export const update = (id: number, payload: CreateUpdateBoardRequestPayload) =>
  instance.put(`board/${id}`, payload);

export const destroy = (id: number) => instance.delete(`board/${id}`);
