export type CardModalProps = {
  open: boolean;
  onClose: (newValues: FormValues) => void;
};

export type FormValues = {
  title: string;
  description: string;
  duedate: Date | undefined;
};
