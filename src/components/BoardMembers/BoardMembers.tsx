import { Modal, Box, Typography } from "@mui/material";
import { FC, useState, useEffect } from "react";
import { useBoardContext } from "../../contexts/BoardContext/BoardContext";
import { auth } from "../../services/endpoints/auth";
import BoardMemberItem from "../BoardMemberItem";
import { BoardMembersProps, UsersType } from "./BoardMembers.types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BoardMembers: FC<BoardMembersProps> = ({ open, onClose }) => {
  const { selectedBoard } = useBoardContext();
  const [users, setUsers] = useState<UsersType>([]);

  useEffect(() => {
    auth.getUserList().then(({ data }) => {
      let users = data
        .filter((user) => user.id !== selectedBoard.ownerId)
        .filter(
          (user) =>
            !selectedBoard.members.find((member) => user.id === member.id)
        );
      setUsers(users);
    });
  }, [selectedBoard]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Board Members
        </Typography>
        {selectedBoard.members && selectedBoard.members.length > 0 ? (
          selectedBoard.members.map((member) => (
            <BoardMemberItem key={member.id} user={member} isMember={true} />
          ))
        ) : (
          <Typography sx={{ mt: 2 }}>No members</Typography>
        )}
        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          Add New Members
        </Typography>
        {users.map((user) => (
          <BoardMemberItem key={user.id} user={user} isMember={false} />
        ))}
      </Box>
    </Modal>
  );
};

export default BoardMembers;
