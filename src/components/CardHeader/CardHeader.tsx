import {
  AppBar,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import CheckIcon from "@mui/icons-material/Check";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import TodayIcon from "@mui/icons-material/Today";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import { Styled } from "./CardHeader.styled";
import { useState, FC, ChangeEvent, useEffect } from "react";
import { CardHeaderProps } from "./CardHeader.types";
import { useListContext } from "../../contexts/ListContext/ListContext";
import { card } from "../../services/endpoints/card";
import { checklist } from "../../services/endpoints/checklist";
import { useCardContext } from "../../contexts/CardContext/CardContext";
import { label } from "../../services/endpoints/label";
import { LabelType } from "../../services/endpoints/label/types";
import { cardLabel } from "../../services/endpoints/card-label";

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

const CardHeader: FC<CardHeaderProps> = ({ duedate, onChange }) => {
  const { deleteCard } = useListContext();
  const { selectedCard, addChecklist, addLabel } = useCardContext();
  const [checklistTitle, setChecklistTitle] = useState<string>("");
  const [labels, setLabels] = useState(Array<LabelType>);

  const [deleteAnchorEl, setDeleteAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const openDeleteMenu = Boolean(deleteAnchorEl);
  const [dateAnchorEl, setDateAnchorEl] = useState<null | HTMLElement>(null);
  const openDateMenu = Boolean(dateAnchorEl);
  const [labelsAnchorEl, setLabelsAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const openLabelsMenu = Boolean(labelsAnchorEl);
  const [checklistAnchorEl, setChecklistAnchorEl] =
    useState<null | HTMLElement>(null);
  const openChecklistMenu = Boolean(checklistAnchorEl);

  useEffect(() => {
    if (selectedCard.labels.length === 0) {
      label.getList().then(({ data }) => {
        setLabels(data);
      });
    } else {
      setLabels([]);
    }
  }, [selectedCard.labels]);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setChecklistTitle(e.target.value);
  };

  const handleSubmit = () => {
    checklist
      .create({ cardId: selectedCard.id, title: checklistTitle })
      .then(({ data }) => {
        addChecklist(data);
      });
    setChecklistTitle("");
    setChecklistAnchorEl(null);
  };

  const handleDeleteCard = () => {
    card.destroy(selectedCard.id).then(() => {
      deleteCard(selectedCard.listId, selectedCard.id);
    });
  };

  const handleLabels = (id: number) => {
    cardLabel
      .create({ cardId: selectedCard.id, labelId: id })
      .then(({ data }) => {
        let label = labels.find((label) => label.id === id);
        if (label) {
          const cardlabel = { ...label, CardLabel: data };
          addLabel(cardlabel);
        }
      });
  };

  return (
    <Styled>
      <AppBar
        position="static"
        color="transparent"
        sx={{ borderRadius: "20px" }}
      >
        <Toolbar>
          <IconButton
            onClick={(event) => setDateAnchorEl(event.currentTarget)}
            aria-controls={openDateMenu ? "duedate-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openDateMenu ? "true" : undefined}
          >
            <TodayIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton
            onClick={(event) => setLabelsAnchorEl(event.currentTarget)}
            aria-controls={openLabelsMenu ? "labels" : undefined}
            aria-haspopup="true"
            aria-expanded={openLabelsMenu ? "true" : undefined}
          >
            <LabelOutlinedIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton
            onClick={(event) => setChecklistAnchorEl(event.currentTarget)}
            aria-controls={openChecklistMenu ? "checklist-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openChecklistMenu ? "true" : undefined}
          >
            <CheckBoxOutlinedIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton
            onClick={(event) => setDeleteAnchorEl(event.currentTarget)}
            aria-controls={openDeleteMenu ? "card-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openDeleteMenu ? "true" : undefined}
          >
            <MoreIcon sx={{ color: "white" }} />
          </IconButton>
        </Toolbar>
        <Menu
          anchorEl={dateAnchorEl}
          id="duedate-menu"
          open={openDateMenu}
          onClose={() => setDateAnchorEl(null)}
          PaperProps={{
            elevation: 0,
            sx: style,
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <TextField
              fullWidth
              onChange={onChange}
              type="date"
              value={duedate}
              name="duedate"
            />
          </MenuItem>
        </Menu>
        <Menu
          anchorEl={labelsAnchorEl}
          id="labels"
          open={openLabelsMenu}
          onClose={() => setLabelsAnchorEl(null)}
          onClick={() => setLabelsAnchorEl(null)}
          PaperProps={{
            elevation: 0,
            sx: style,
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {labels.map((label) => (
            <MenuItem key={label.id} onClick={() => handleLabels(label.id)}>
              {label.title}
            </MenuItem>
          ))}
        </Menu>
        <Menu
          anchorEl={checklistAnchorEl}
          id="checklist-menu"
          open={openChecklistMenu}
          onClose={() => setChecklistAnchorEl(null)}
          PaperProps={{
            elevation: 0,
            sx: style,
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <TextField
              fullWidth
              required
              placeholder="Checklist title"
              onChange={handleChangeTitle}
              value={checklistTitle}
              name="title"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSubmit}>
                      <CheckIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </MenuItem>
        </Menu>
        <Menu
          anchorEl={deleteAnchorEl}
          id="card-menu"
          open={openDeleteMenu}
          onClose={() => setDeleteAnchorEl(null)}
          onClick={() => setDeleteAnchorEl(null)}
          PaperProps={{
            elevation: 0,
            sx: style,
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleDeleteCard}>Delete Card</MenuItem>
        </Menu>
      </AppBar>
    </Styled>
  );
};

export default CardHeader;
