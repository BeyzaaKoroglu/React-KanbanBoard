export type BoardListItemProps = {
  board: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    ownerId: number;
    members: Array<{
      id: number;
      username: string;
      createdAt: string;
      updatedAt: string;
      BoardMember: any;
    }>;
  };
};
