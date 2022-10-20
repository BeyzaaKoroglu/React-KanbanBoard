import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Styled } from "./Lists.styled";
import { ChangeEvent, useState } from "react";
import { list } from "../../services/endpoints/list";
import { useBoardContext } from "../../contexts/BoardContext/BoardContext";
import { useListContext } from "../../contexts/ListContext/ListContext";
import ListItem from "../ListItem";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useLoginContext } from "../../contexts/LoginContext/LoginContext";

const Lists = () => {
  const { selectedBoard } = useBoardContext();
  const { userId } = useLoginContext();
  const { lists, addList, DragDropList, DragDropCard } = useListContext();
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleAdd = () => {
    if (value !== "") {
      list
        .create({
          title: value,
          boardId: selectedBoard.id,
          order: lists.length,
        })
        .then(({ data }) => {
          addList(data);
          setValue("");
          setEdit(false);
        });
    }
  };

  const handleCancel = () => {
    setValue("");
    setEdit(false);
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (type === "list") {
      if (userId === selectedBoard.ownerId)
        DragDropList(destination.index, source.index);
      else alert("You are not owner.\nYou can not change order of lists.");
      return;
    }

    DragDropCard(destination, source);
    return;
  };
  return (
    <Styled>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId={String(selectedBoard.id)}
          type="list"
          direction="horizontal"
        >
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {lists.map((list, index) => (
                <ListItem key={list.id} list={list} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {edit ? (
          <Card sx={{ width: 250, margin: "15px", maxHeight: 125 }}>
            <CardContent>
              <TextField
                variant="filled"
                label="List Title"
                type="text"
                required
                value={value}
                name="title"
                onChange={handleChange}
              />
              <Button onClick={handleAdd}>Add</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </CardContent>
          </Card>
        ) : (
          <Card
            sx={{
              width: 250,
              margin: "15px",
              maxHeight: 65,
              background: "#F0f0f0",
            }}
          >
            <CardContent onClick={() => setEdit(true)}>
              <Typography variant="h6" component="span">
                <AddCircleIcon
                  color="error"
                  fontSize="large"
                  sx={{ marginBottom: "-10px", marginRight: 1 }}
                />
                Add a list
              </Typography>
            </CardContent>
          </Card>
        )}
      </DragDropContext>
    </Styled>
  );
};

export default Lists;
