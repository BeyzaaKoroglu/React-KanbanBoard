import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useBoardContext } from "../../contexts/BoardContext/BoardContext";
import { useLoginContext } from "../../contexts/LoginContext/LoginContext";
import { board } from "../../services/endpoints/board";
import { Styled } from "./BoardHeader.styled";
import { BoardHeaderProps } from "./BoardHeader.type";
import MenuComponent from "../MenuComponent";

const BoardHeader: FC<BoardHeaderProps> = ({ onOpenModel, onChangePage }) => {
  const { selectedBoard, updateBoard, deleteBoard } = useBoardContext();
  const { logout, userId } = useLoginContext();
  const [value, setValue] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    if (selectedBoard) setValue(selectedBoard.title);
  }, [selectedBoard]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    setEdit(false);
    board.update(selectedBoard.id, { title: value }).then(({ data }) => {
      updateBoard(data);
    });
  };

  const handleCancel = () => {
    setValue(selectedBoard.title);
    setEdit(false);
  };

  const handleDelete = () => {
    board.destroy(selectedBoard.id).then(() => {
      deleteBoard(selectedBoard.id);
      onChangePage();
    });
  };

  const handleLogout = () => {
    logout();
    onChangePage();
  };
  return (
    <Styled>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button onClick={() => onChangePage()} color="inherit">
              Boards
            </Button>
          </Typography>
          {selectedBoard.ownerId === userId && edit ? (
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                variant="standard"
                type="text"
                value={value}
                name="title"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleSubmit}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleCancel}
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          ) : (
            <Typography onClick={() => setEdit(true)} sx={{ flexGrow: 1 }}>
              {selectedBoard.title}
            </Typography>
          )}

          <IconButton
            size="large"
            aria-label="show more"
            aria-haspopup="true"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            color="inherit"
          >
            <SettingsIcon />
          </IconButton>
          <MenuComponent
            id=""
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {selectedBoard.ownerId === userId && (
              <Box>
                <MenuItem onClick={onOpenModel}>Board Members</MenuItem>
                <MenuItem onClick={handleDelete}>Delete Board</MenuItem>
                <Divider />
              </Box>
            )}
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ marginRight: 1 }} />
              Logout
            </MenuItem>
          </MenuComponent>
        </Toolbar>
      </AppBar>
    </Styled>
  );
};

export default BoardHeader;
