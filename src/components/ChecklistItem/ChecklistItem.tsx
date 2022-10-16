import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
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
          <CheckCircleOutlineIcon fontSize="small" sx={{ marginRight: 1 }} />
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
          background: "blue",
          height: "3px",
          width: "93%",
          float: "right",
          marginTop: "-16px",
        }}
      />
      <ItemList
        checklistId={checklist.id}
        items={checklist.items ? checklist.items : []}
      />
      <Menu
        anchorEl={anchorEl}
        id="checklist-menu"
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
        <MenuItem onClick={() => setEdit(true)}>Rename Checklist</MenuItem>
        <MenuItem onClick={handleDelete}>Delete Checklist</MenuItem>
      </Menu>
    </Box>
  );
};

export default ChecklistItem;
