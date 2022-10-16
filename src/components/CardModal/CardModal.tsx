import {
  Typography,
  Box,
  Modal,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useBoardContext } from "../../contexts/BoardContext/BoardContext";
import { useListContext } from "../../contexts/ListContext/ListContext";
import CardHeader from "../CardHeader";
import { CardModalProps, FormValues } from "./CardModal.types";
import Visibility from "@mui/icons-material/Visibility";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckLists from "../CheckLists";
import { useCardContext } from "../../contexts/CardContext/CardContext";
import Labels from "../Labels";
import CommentList from "../CommentList";

const style = {
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
};

const CardModal: FC<CardModalProps> = ({ open, onClose }) => {
  const { selectedBoard } = useBoardContext();
  const { lists } = useListContext();
  const { selectedCard } = useCardContext();
  const [listTitle, setListTitle] = useState<string | undefined>();
  const [formValues, setFormValues] = useState<FormValues>({
    title: selectedCard.title,
    description: selectedCard.description ? selectedCard.description : "",
    duedate: selectedCard.duedate ? selectedCard.duedate : undefined,
  });

  useEffect(() => {
    setListTitle(lists.find((list) => list.id === selectedCard.listId)?.title);
    setFormValues({
      title: selectedCard.title,
      description: selectedCard.description ? selectedCard.description : "",
      duedate: selectedCard.duedate ? selectedCard.duedate : undefined,
    });
  }, [selectedCard]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDeleteDuedate = () => {
    setFormValues({ ...formValues, duedate: undefined });
  };

  return (
    <Modal
      open={open}
      onClose={() => onClose(formValues)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CardHeader duedate={formValues.duedate} onChange={handleChange} />
        <Box sx={{ p: 4 }}>
          <Typography variant="h6" component="h2">
            {selectedBoard.title + " > " + listTitle}
            {formValues.duedate && (
              <Box
                sx={{
                  float: "right",
                  paddingY: 1,
                  paddingLeft: 2,
                  paddingRight: 0,
                  border: "1px solid #cbcbcb",
                }}
              >
                {String(formValues.duedate)}
                <IconButton
                  onClick={handleDeleteDuedate}
                  sx={{ marginTop: "-5px", marginLeft: 3 }}
                >
                  <HighlightOffIcon />
                </IconButton>
              </Box>
            )}
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
          {selectedCard.labels.length > 0 && <Labels />}
          {selectedCard.checklists.length > 0 && <CheckLists />}
          <CommentList />
        </Box>
      </Box>
    </Modal>
  );
};

export default CardModal;
