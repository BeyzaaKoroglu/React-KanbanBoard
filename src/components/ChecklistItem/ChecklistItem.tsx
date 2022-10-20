import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { ChecklistItemProps } from "./ChecklistItem.types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MoreIcon from "@mui/icons-material/MoreVert";
import { checklist as checklistService } from "../../services/endpoints/checklist";
import { useCardContext } from "../../contexts/CardContext/CardContext";
import ItemList from "../ItemList";
import MenuComponent from "../MenuComponent";

const ChecklistItem: FC<ChecklistItemProps> = ({ checklist }) => {
  const { deleteChecklist, updateChecklist, selectedCard } = useCardContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(checklist.title);
  const [items, setItems] = useState({ allItems: 0, checkedItems: 0 });

  useEffect(() => {
    setItems({
      allItems: checklist.items?.length || 0,
      checkedItems:
        checklist.items?.filter((item) => item.isChecked === true).length || 0,
    });
  }, [selectedCard.checklists]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleRename = () => {
    checklistService.update(checklist.id, { title: value }).then(({ data }) => {
      updateChecklist(data);
    });
    setEdit(false);
  };
  const handleCancelEdit = () => {
    setEdit(false);
    setValue(value);
  };
  const handleDelete = () => {
    checklistService.destroy(checklist.id);
    deleteChecklist(checklist.id);
  };

  return (
    <Box sx={{ paddingTop: 4 }}>
      {edit ? (
        <TextField
          fullWidth
          variant="standard"
          type="text"
          value={value}
          name="checklistTitle"
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
                  onClick={handleCancelEdit}
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <Typography variant="h6">
          <CheckCircleOutlineIcon
            fontSize="medium"
            sx={{ marginBottom: "-4px", marginRight: 1 }}
          />
          {checklist.title}
          <IconButton
            onClick={(event) => setAnchorEl(event.currentTarget)}
            size="small"
            edge="end"
            sx={{ float: "right" }}
            aria-controls={openMenu ? "checklist-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
          >
            <MoreIcon sx={{ width: 24, height: 24 }} />
          </IconButton>
        </Typography>
      )}
      <Typography variant="h6">
        {items.checkedItems}/{items.allItems}
      </Typography>
      <Divider
        sx={{
          background: `linear-gradient(to right, #1976d2 ${
            items.allItems === 0
              ? "100"
              : String((items.checkedItems / items.allItems) * 100)
          }%, #a8cbee 0%)`,
          height: "5px",
          width: "93%",
          float: "right",
          marginTop: "-16px",
          borderRadius: "3px",
        }}
      />
      <ItemList
        checklistId={checklist.id}
        items={checklist.items ? checklist.items : []}
      />
      <MenuComponent
        anchorEl={anchorEl}
        id="checklist-menu"
        open={openMenu}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setEdit(true)}>Rename Checklist</MenuItem>
        <MenuItem onClick={handleDelete}>Delete Checklist</MenuItem>
      </MenuComponent>
    </Box>
  );
};

export default ChecklistItem;
