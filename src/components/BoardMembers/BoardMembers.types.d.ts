export type BoardMembersProps = {
  onClose: () => void;
  open: boolean;
};

export type UsersType = Array<{
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
}>;
