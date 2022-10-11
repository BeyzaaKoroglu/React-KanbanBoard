import {
  Card,
  CardContent,
  Divider,
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
import AddIcon from "@mui/icons-material/Add";
import { FC, useState } from "react";
import { Styled } from "./ListItem.styled";
import { FormValuesTypes, ListItemProps } from "./ListItem.types";
import { list as listServices } from "../../services/endpoints/list";
import { useListContext } from "../../contexts/ListContext/ListContext";
import { useBoardContext } from "../../contexts/BoardContext/BoardContext";
import { useLoginContext } from "../../contexts/LoginContext/LoginContext";
import { Draggable } from "react-beautiful-dnd";
import { card } from "../../services/endpoints/card";
import CardList from "../CardList";

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

const ListItem: FC<ListItemProps> = ({ list, index }) => {
  const { deleteList, updateList, addCard } = useListContext();
  const { selectedBoard } = useBoardContext();
  const { userId } = useLoginContext();
  const [edit, setEdit] = useState<boolean>(false);
  const [addNewCard, setAddNewCard] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValuesTypes>({
    listTitle: list.title,
    cardTitle: "",
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleRename = () => {
    if (formValues.listTitle !== "") {
      listServices
        .update(list.id, { title: formValues.listTitle })
        .then(({ data }) => {
          updateList(data);
          setEdit(false);
        });
    }
  };

  const handleCancelListEdit = () => {
    setFormValues({ ...formValues, listTitle: "" });
    setEdit(false);
  };

  const handleDelete = () => {
    listServices.destroy(list.id).then(() => {
      deleteList(list.id);
    });
  };

  const handleAddCard = () => {
    if (formValues.cardTitle !== "") {
      card
        .create({ title: formValues.cardTitle, listId: list.id })
        .then(({ data }) => {
          addCard(list.id, data);
          setAddNewCard(false);
          setFormValues({ ...formValues, cardTitle: "" });
        });
    }
  };

  const handleCancelAddCard = () => {
    setFormValues({ ...formValues, cardTitle: "" });
    setAddNewCard(false);
  };

  return (
    <Draggable draggableId={String(list.id)} index={index}>
      {(provided) => (
        <Styled
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Card sx={{ width: 250, background: "#F0f0f0" }}>
            <CardContent>
              {edit ? (
                <TextField
                  variant="standard"
                  type="text"
                  value={formValues.listTitle}
                  name="listTitle"
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
                          onClick={handleCancelListEdit}
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

            {list.cards && list.cards.length > 0 && (
              <CardList cards={list.cards} />
            )}
            <Divider />

            <CardContent sx={{ maxHeight: 20 }}>
              {addNewCard ? (
                <TextField
                  variant="standard"
                  type="text"
                  value={formValues.cardTitle}
                  name="cardTitle"
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleAddCard}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleCancelAddCard}
                        >
                          <CloseIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <Typography variant="h6" onClick={() => setAddNewCard(true)}>
                  <AddIcon sx={{ marginRight: 1, width: 24, height: 24 }} />
                  Add a card
                </Typography>
              )}
            </CardContent>
          </Card>
        </Styled>
      )}
    </Draggable>
  );
};

export default ListItem;
