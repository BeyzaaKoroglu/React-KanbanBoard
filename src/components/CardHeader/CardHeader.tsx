import {
  AppBar,
  IconButton,
  InputAdornment,
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
import MenuComponent from "../MenuComponent";

const CardHeader: FC<CardHeaderProps> = ({
  duedate,
  onChange,
  onDeleteDuedate,
}) => {
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
        <MenuComponent
          anchorEl={dateAnchorEl}
          id="duedate-menu"
          open={openDateMenu}
          onClose={() => setDateAnchorEl(null)}
        >
          {duedate ? (
            <MenuItem onClick={onDeleteDuedate}>Delete Duedate</MenuItem>
          ) : (
            <MenuItem>
              <TextField
                fullWidth
                onChange={onChange}
                type="date"
                name="duedate"
              />
            </MenuItem>
          )}
        </MenuComponent>
        <MenuComponent
          anchorEl={labelsAnchorEl}
          id="labels"
          open={openLabelsMenu}
          onClose={() => setLabelsAnchorEl(null)}
          onClick={() => setLabelsAnchorEl(null)}
        >
          {labels.map((label) => (
            <MenuItem key={label.id} onClick={() => handleLabels(label.id)}>
              {label.title}
            </MenuItem>
          ))}
        </MenuComponent>
        <MenuComponent
          anchorEl={checklistAnchorEl}
          id="checklist-menu"
          open={openChecklistMenu}
          onClose={() => setChecklistAnchorEl(null)}
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
        </MenuComponent>
        <MenuComponent
          anchorEl={deleteAnchorEl}
          id="card-menu"
          open={openDeleteMenu}
          onClose={() => setDeleteAnchorEl(null)}
          onClick={() => setDeleteAnchorEl(null)}
        >
          <MenuItem onClick={handleDeleteCard}>Delete Card</MenuItem>
        </MenuComponent>
      </AppBar>
    </Styled>
  );
};

export default CardHeader;
