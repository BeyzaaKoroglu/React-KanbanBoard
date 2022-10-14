export type ItemProps = {
  item: ItemType;
};

export type ItemType = {
  id: number;
  checklistId: number;
  title: string;
  isChecked: boolean;
};
