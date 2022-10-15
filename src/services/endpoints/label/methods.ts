import instance from "../../instance";
import { LabelsResponsePayload } from "./types";

export const getList = (): Promise<LabelsResponsePayload> =>
  instance.get("label");
