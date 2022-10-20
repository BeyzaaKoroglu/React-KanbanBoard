export type MenuComponentProps = {
  open: boolean;
  anchorEl: null | HTMLElement;
  id: string;
  onClose: () => void;
  onClick?: () => void;
  children?: ReactNode | undefined;
};
