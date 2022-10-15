export type LabelsResponsePayload = {
  data: Array<LabelType>;
};

export type LabelType = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  CardLabel?: {
    id: number;
  };
};
