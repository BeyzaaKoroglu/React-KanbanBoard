import { IconButton, Typography, Box } from "@mui/material";
import { FC } from "react";
import { useBoardContext } from "../../contexts/BoardContext/BoardContext";
import { boardMember } from "../../services/endpoints/board-member";
import { BoardMemberItemProps } from "./BoardMemberItem.types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const BoardMemberItem: FC<BoardMemberItemProps> = ({ user, isMember }) => {
  const { selectedBoard, updateBoard } = useBoardContext();

  const handleAddMember = () => {
    boardMember
      .create({ username: user.username, boardId: selectedBoard.id })
      .then(({ data }) => {
        user.BoardMember = data;
        if (!selectedBoard.members) selectedBoard.members = [];
        const board = {
          ...selectedBoard,
          members: [...selectedBoard.members, user],
        };
        updateBoard(board);
      });
  };

  const handleDeleteMember = () => {
    const member = selectedBoard.members.find(
      (member) => member.id === user.id
    );

    if (member?.BoardMember) {
      boardMember.destroy(member.BoardMember.id).then(() => {
        const board = { ...selectedBoard };
        board.members = selectedBoard.members.filter(
          (item) => item.id !== member.id
        );
        updateBoard(board);
      });
    }
  };

  return (
    <Box>
      <Typography sx={{ mt: 1 }}>
        {isMember ? (
          <IconButton
            onClick={handleDeleteMember}
            edge="start"
            sx={{ marginRight: 1, color: "red" }}
          >
            <CancelIcon fontSize="large" />
          </IconButton>
        ) : (
          <IconButton
            onClick={handleAddMember}
            edge="start"
            sx={{ marginRight: 1, color: "#1976d2" }}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
        )}
        {user.username}{" "}
      </Typography>
    </Box>
  );
};

export default BoardMemberItem;
