import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { useBoardContext } from "../../contexts/BoardContext/BoardContext";
import { boardMember } from "../../services/endpoints/board-member";
import { BoardMemberItemProps } from "./BoardMemberItem.types";

const BoardMemberItem: FC<BoardMemberItemProps> = ({ user, isMember }) => {
  const { selectedBoard, updateBoard } = useBoardContext();

  const handleAddMember = () => {
    boardMember
      .create({ username: user.username, boardId: selectedBoard.id })
      .then(({ data }) => {
        user.BoardMember = data;
        const board = { ...selectedBoard, members: [...selectedBoard.members] };
        board.members.push(user);
        updateBoard(board);
      });
  };

  const handleDeleteMember = () => {
    const member = selectedBoard.members.find(
      (member) => member.id === user.id
    );

    boardMember.destroy(member.BoardMember.id).then(() => {
      const board = { ...selectedBoard };
      board.members = selectedBoard.members.filter(
        (item) => item.id !== member.id
      );
      updateBoard(board);
    });
  };

  return (
    <Typography sx={{ mt: 2 }}>
      {user.username}{" "}
      {isMember ? (
        <Button onClick={handleDeleteMember}>Delete</Button>
      ) : (
        <Button onClick={handleAddMember}>Add</Button>
      )}
    </Typography>
  );
};

export default BoardMemberItem;
