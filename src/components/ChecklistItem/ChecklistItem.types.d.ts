export type ChecklistItemProps = {
  checklist: ChecklistType;
};

export type ChecklistType = {
  id: number;
  cardId: number;
  title: string;
  updatedAt: string;
  createdAt: string;
  items?: Array<ItemType>;
};

export type ItemType = {
  id: number;
  checklistId: number;
  title: string;
  isChecked: boolean;
};
