export type ModalComponentProps = {
  open: boolean;
  onClose: () => void;
  children?: ReactNode | undefined;
  id: string;
};
