import { Typography, Box, TextField, InputAdornment } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useBoardContext } from "../../contexts/BoardContext/BoardContext";
import { useListContext } from "../../contexts/ListContext/ListContext";
import CardHeader from "../CardHeader";
import { CardModalProps, FormValues } from "./CardModal.types";
import Visibility from "@mui/icons-material/Visibility";
import CheckLists from "../CheckLists";
import { useCardContext } from "../../contexts/CardContext/CardContext";
import Labels from "../Labels";
import CommentList from "../CommentList";
import ModalComponent from "../ModalComponent";

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
    <ModalComponent open={open} onClose={() => onClose(formValues)} id={"Card"}>
      <CardHeader
        duedate={Boolean(formValues.duedate)}
        onChange={handleChange}
        onDeleteDuedate={handleDeleteDuedate}
      />
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" component="h2">
          {selectedBoard.title + " > " + listTitle}
          {formValues.duedate && (
            <TextField
              onChange={handleChange}
              type="date"
              value={formValues.duedate}
              name="duedate"
              sx={{
                float: "right",
                width: 200,
              }}
            />
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
    </ModalComponent>
  );
};

export default CardModal;
