import { ChecklistItemType } from "../../services/endpoints/checklist-item/types";

export type ItemListProps = {
  items: Array<ChecklistItemType>;
  checklistId: number;
};
