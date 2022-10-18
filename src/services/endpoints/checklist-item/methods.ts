import instance from "../../instance";
import {
  CreateRequestPayload,
  CreateResponsePayload,
  UpdateRequestPayload,
} from "./types";

export const create = (
  payload: CreateRequestPayload
): Promise<CreateResponsePayload> => instance.post("checklist-item", payload);

export const destroy = (id: number) => instance.delete(`checklist-item/${id}`);

export const update = (id: number, payload: UpdateRequestPayload) =>
  instance.put(`checklist-item/${id}`, payload);
