export type BoardListItemProps = {
  board: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    ownerId: number;
    members: any;
  };
};
