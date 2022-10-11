export type ListItemProps = {
  list: {
    id: number;
    title: string;
    boardId: number;
    updatedAt: string;
    createdAt: string;
    cards: Array<any>;
  };
  index: number;
};

export type FormValuesTypes = {
  listTitle: string;
  cardTitle: string;
};
