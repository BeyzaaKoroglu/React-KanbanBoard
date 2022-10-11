import {
  Typography,
  Box,
  Modal,
  TextField,
  InputAdornment,
} from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { useBoardContext } from "../../contexts/BoardContext/BoardContext";
import { useListContext } from "../../contexts/ListContext/ListContext";
import { card as cardService } from "../../services/endpoints/card";
import CardHeader from "../CardHeader";
import { CardModalProps, FormValues } from "./CardModal.types";
import Visibility from "@mui/icons-material/Visibility";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
};

const CardModal: FC<CardModalProps> = ({ open, onClose, card }) => {
  const { selectedBoard } = useBoardContext();
  const { lists, deleteCard } = useListContext();
  const [listTitle, setListTitle] = useState<string | undefined>(
    lists.find((list) => list.id === card.listId)?.title
  );
  const [formValues, setFormValues] = useState<FormValues>({
    title: card.title,
    description: card.description ? card.description : "",
    duedate: card.duedate ? card.duedate : undefined,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDeleteCard = () => {
    cardService.destroy(card.id).then(() => {
      deleteCard(card.listId, card.id);
    });
  };

  return (
    <Modal
      open={open}
      onClose={() => onClose(formValues)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CardHeader
          duedate={formValues.duedate}
          onChange={handleChange}
          onDeleteCard={handleDeleteCard}
        />
        <Box sx={{ p: 4 }}>
          <Typography variant="h6" component="h2">
            {selectedBoard.title + " > " + listTitle}
          </Typography>
          <TextField
            required
            name="title"
            value={formValues.title}
            label="Title"
            onChange={handleChange}
            sx={{ marginTop: 2 }}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Visibility />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="description"
            value={formValues.description ? formValues.description : ""}
            label="Description"
            onChange={handleChange}
            sx={{ marginTop: 2 }}
            multiline
            fullWidth
            rows="3"
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default CardModal;
