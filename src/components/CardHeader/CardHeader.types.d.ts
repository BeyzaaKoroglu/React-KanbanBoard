export type CardHeaderProps = {
  duedate: Date | undefined;
  onDeleteCard: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
