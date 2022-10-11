import instance from "../../instance";
import {
  CreateRequestPayload,
  CreateResponsePayload,
  UpdateRequestPayload,
} from "./types";

export const create = (
  payload: CreateRequestPayload
): Promise<CreateResponsePayload> => instance.post("card", payload);

export const destroy = (id: number) => instance.delete(`card/${id}`);

export const update = (id: number, payload: UpdateRequestPayload) =>
  instance.put(`card/${id}`, payload);
