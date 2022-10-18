import { ListType } from "../../services/endpoints/list/types";

export type ListItemProps = {
  list: ListType;
  index: number;
};

export type FormValuesTypes = {
  listTitle: string;
  cardTitle: string;
};
