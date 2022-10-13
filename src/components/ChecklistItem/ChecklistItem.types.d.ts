export type ChecklistItemProps = {
  checklist: ChecklistType;
};

export type ChecklistType = {
  id: number;
  cardId: number;
  title: string;
  updatedAt: string;
  createdAt: string;
};
