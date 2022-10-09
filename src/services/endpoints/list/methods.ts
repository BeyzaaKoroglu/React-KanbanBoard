import instance from "../../instance";
import { CreateUpdateRequestPayload, ListsResponseType } from "./types";

export const getList = (id: number): Promise<ListsResponseType> =>
  instance.get(`list?boardId=${id}`);

export const create = (payload: CreateUpdateRequestPayload) =>
  instance.post("list", payload);

export const update = (id: number, payload: CreateUpdateRequestPayload) =>
  instance.put(`list/${id}`, payload);

export const destroy = (id: number) => instance.delete(`list/${id}`);
