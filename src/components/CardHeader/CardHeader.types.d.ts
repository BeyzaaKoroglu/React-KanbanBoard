export type CardHeaderProps = {
  duedate: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteDuedate: () => void;
};
