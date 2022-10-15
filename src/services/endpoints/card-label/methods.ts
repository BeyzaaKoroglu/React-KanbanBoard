import instance from "../../instance";
import { CreateRequestPayload } from "./types";

export const create = (payload: CreateRequestPayload) =>
  instance.post("card-label", payload);

export const destroy = (id: number) => instance.delete(`card-label/${id}`);
