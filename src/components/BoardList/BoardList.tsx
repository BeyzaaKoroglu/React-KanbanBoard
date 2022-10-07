import { Card, CardContent, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FC } from "react";
import { useBoardContext } from "../../contexts/BoardContext/BoardContext";
import BoardListItem from "../BoardListItem";
import { Styled } from "./BoardList.styled";
import { BoardListProps } from "./BoardList.types";

const BoardList: FC<BoardListProps> = (props) => {
  const { boards } = useBoardContext();

  const handleAddBoard = () => {
    props.onAddBoard();
  };

  return (
    <Styled>
      {boards.map((item) => (
        <BoardListItem key={item.id} board={item} />
      ))}
      <Card onClick={handleAddBoard} sx={{ width: 250, margin: "15px" }}>
        <CardContent sx={{ padding: 3 }}>
          <AddCircleIcon fontSize="large" color="primary" sx={{ marginBottom: 1 }} />
          <Typography variant="h5" component="div">
            Add new board
          </Typography>
        </CardContent>
      </Card>
    </Styled>
  );
};

export default BoardList;
