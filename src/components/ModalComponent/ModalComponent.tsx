import { Box, Modal } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { ModalComponentProps } from "./ModalComponent.types";

const ModalComponent: FC<ModalComponentProps> = ({
  open,
  onClose,
  children,
  id,
}) => {
  const [style, setStyle] = useState({
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "20px",
    overflowY: "auto",
    maxHeight: "700px",
  });
  useEffect(() => {
    if (id === "BoardMember") setStyle({ ...style, width: 300 });
  }, [id]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default ModalComponent;
