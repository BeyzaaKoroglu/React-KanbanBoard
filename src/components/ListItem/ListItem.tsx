import {
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { FC, useState } from "react";
import { Styled } from "./ListItem.styled";
import { ListItemProps } from "./ListItem.types";
import { list as listServices } from "../../services/endpoints/list";
import { useListContext } from "../../contexts/ListContext/ListContext";
import { useBoardContext } from "../../contexts/BoardContext/BoardContext";
import { useLoginContext } from "../../contexts/LoginContext/LoginContext";

const style = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1.5,
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: "background.paper",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
};

const ListItem: FC<ListItemProps> = ({ list }) => {
  const { deleteList, updateList } = useListContext();
  const { selectedBoard } = useBoardContext();
  const { userId } = useLoginContext();
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(list.title);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleRename = () => {
    if (value !== "") {
      listServices
        .update(list.id, { title: value, boardId: list.boardId })
        .then(({ data }) => {
          updateList(data);
          setEdit(false);
          console.log(data);
        });
    }
  };

  const handleCancel = () => {
    setValue(list.title);
    setEdit(false);
  };

  const handleDelete = () => {
    listServices.destroy(list.id).then(() => {
      deleteList(list.id);
    });
  };

  return (
    <Styled>
      <Card sx={{ width: 250 }}>
        <CardContent>
          {edit ? (
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
                      onClick={handleRename}
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
          ) : (
            <Typography variant="h6">
              {list.title}
              {selectedBoard.ownerId === userId && (
                <Tooltip title="List settings">
                  <IconButton
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                    size="small"
                    edge="end"
                    sx={{ float: "right" }}
                    aria-controls={openMenu ? "list-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : undefined}
                  >
                    <MoreIcon sx={{ width: 24, height: 24 }} />
                  </IconButton>
                </Tooltip>
              )}
            </Typography>
          )}
          <Menu
            anchorEl={anchorEl}
            id="list-menu"
            open={openMenu}
            onClose={() => setAnchorEl(null)}
            onClick={() => setAnchorEl(null)}
            PaperProps={{
              elevation: 0,
              sx: style,
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => setEdit(true)}>Rename List</MenuItem>
            <MenuItem onClick={handleDelete}>Delete List</MenuItem>
          </Menu>
        </CardContent>
      </Card>
    </Styled>
  );
};

export default ListItem;