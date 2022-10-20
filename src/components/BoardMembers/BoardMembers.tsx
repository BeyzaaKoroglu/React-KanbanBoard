import { Box, Typography, AppBar, Toolbar, Divider } from "@mui/material";
import { FC, useState, useEffect } from "react";
import { useBoardContext } from "../../contexts/BoardContext/BoardContext";
import { auth } from "../../services/endpoints/auth";
import { UserType } from "../../services/endpoints/auth/types";
import BoardMemberItem from "../BoardMemberItem";
import ModalComponent from "../ModalComponent";
import { BoardMembersProps } from "./BoardMembers.types";

const BoardMembers: FC<BoardMembersProps> = ({ open, onClose }) => {
  const { selectedBoard } = useBoardContext();
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    auth.getUserList().then(({ data }) => {
      let users = data
        .filter((user) => user.id !== selectedBoard.ownerId)
        .filter(
          (user) =>
            !selectedBoard.members?.find((member) => user.id === member.id)
        );
      setUsers(users);
    });
  }, [selectedBoard]);

  return (
    <ModalComponent open={open} onClose={onClose} id={"BoardMember"}>
      <Box
        sx={{
          width: "100%",
          borderRadius: "20px 20px 0 0",
          background: "rgb(23, 37, 65)",
          color: "white",
        }}
      >
        <AppBar
          position="static"
          color="transparent"
          sx={{ borderRadius: "20px" }}
        >
          <Toolbar>
            <Typography variant="h6" component="h2">
              Board Members
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ p: 4, paddingTop: 1 }}>
        {selectedBoard.members && selectedBoard.members.length > 0 ? (
          selectedBoard.members.map((member) => (
            <BoardMemberItem key={member.id} user={member} isMember={true} />
          ))
        ) : (
          <Typography sx={{ mt: 2 }}>No members</Typography>
        )}
        <Divider />
        <Typography
          variant="h6"
          component="h2"
          sx={{ mt: 2, textDecorationLine: "underline" }}
        >
          Add New Members
        </Typography>
        {users.map((user) => (
          <BoardMemberItem key={user.id} user={user} isMember={false} />
        ))}
      </Box>
    </ModalComponent>
  );
};

export default BoardMembers;
