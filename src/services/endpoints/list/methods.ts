import instance from "../../instance";
import {
  CreateRequestPayload,
  CreateResponseType,
  UpdateRequestPayload,
} from "./types";

export const getList = (id: number): Promise<CreateResponseType> =>
  instance.get(`list?boardId=${id}`);

export const create = (payload: CreateRequestPayload) =>
  instance.post("list", payload);

export const update = (id: number, payload: UpdateRequestPayload) =>
  instance.put(`list/${id}`, payload);

export const destroy = (id: number) => instance.delete(`list/${id}`);
