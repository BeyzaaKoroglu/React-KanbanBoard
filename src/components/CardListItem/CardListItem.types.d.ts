export type CardListItemProps = {
  card: CardType;
};

export type CardType = {
  id: number;
  title: string;
  listId: number;
  updatedAt: string;
  createdAt: string;
  description: string;
  duedate: Date | undefined;
};

export type NewValues = {
  title: string;
  description: string;
  duedate: Date | undefined;
};
