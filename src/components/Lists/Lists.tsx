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

const Lists = () => {
  const { selectedBoard } = useBoardContext();
  const { lists, addList, DragDropList } = useListContext();
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleAdd = () => {
    if (value !== "") {
      list
        .create({ title: value, boardId: selectedBoard.id })
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
    const { destination, source } = result;

    if (!destination) return;

    DragDropList(destination.index, source.index);
    return;
  };
  return (
    <Styled>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId={String(selectedBoard.id)}
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
        <Card sx={{ width: 250, margin: "15px" }}>
          {edit ? (
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
          ) : (
            <CardContent onClick={() => setEdit(true)}>
              <Typography variant="h6" component="span">
                <AddCircleIcon
                  color="error"
                  sx={{ marginRight: 1, width: 24, height: 24 }}
                />
                Add a list
              </Typography>
            </CardContent>
          )}
        </Card>
      </DragDropContext>
    </Styled>
  );
};

export default Lists;
