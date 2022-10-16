import instance from "../../instance";
import { CreateRequestPayload, CreateResponsePayload } from "./types";

export const create = (
  payload: CreateRequestPayload
): Promise<CreateResponsePayload> => instance.post("comment", payload);

export const destroy = (id: number) => instance.delete(`comment/${id}`);
