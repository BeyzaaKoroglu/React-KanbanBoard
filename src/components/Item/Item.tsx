import { Box, Checkbox, IconButton, TextField } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { ChangeEvent, FC, useState } from "react";
import { ItemProps } from "./Item.types";
import { checklistItem } from "../../services/endpoints/checklist-item";
import { useCardContext } from "../../contexts/CardContext/CardContext";

const Item: FC<ItemProps> = ({ item }) => {
  const { deleteItem, updateItem } = useCardContext();
  const [value, setValue] = useState<string>(item.title);
  const [isChecked, setIsChecked] = useState<boolean>(item.isChecked);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleRename = () => {
    if (value !== item.title)
      checklistItem.update(item.id, { title: value }).then(({ data }) => {
        updateItem(data);
      });
  };

  const handleCheckbox = () => {
    checklistItem
      .update(item.id, { isChecked: !isChecked })
      .then(({ data }) => {
        updateItem(data);
      });
    setIsChecked(!isChecked);
  };

  const handleDelete = () => {
    checklistItem.destroy(item.id).then(({ data }) => {
      deleteItem(item.checklistId, item.id);
    });
  };
  return (
    <Box sx={{ marginTop: 1 }}>
      <Checkbox
        checked={isChecked}
        sx={{ marginTop: 1 }}
        onClick={handleCheckbox}
      />
      <TextField
        variant="outlined"
        name="itemTitle"
        value={value}
        onChange={handleChange}
        onBlur={handleRename}
        sx={{ width: "85%" }}
      />
      <IconButton onClick={handleDelete} edge="end" sx={{ float: "right" }}>
        <DeleteForeverOutlinedIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default Item;
