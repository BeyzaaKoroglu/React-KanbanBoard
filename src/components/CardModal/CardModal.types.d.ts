export type CardModalProps = {
  open: boolean;
  onClose: (newValues: FormValues) => void;
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

export type FormValues = {
  title: string;
  description: string;
  duedate: Date | undefined;
};
