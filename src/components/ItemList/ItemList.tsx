import { IconButton, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ChangeEvent, FC, useState } from "react";
import { ItemListProps } from "./ItemList.types";
import { checklistItem } from "../../services/endpoints/checklist-item";
import { useCardContext } from "../../contexts/CardContext/CardContext";
import Item from "../Item";

const ItemList: FC<ItemListProps> = ({ checklistId, items }) => {
  const [value, setValue] = useState<string>("");
  const { addItem } = useCardContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleCreateItem = () => {
    checklistItem
      .create({
        title: value,
        checklistId: checklistId,
        isChecked: false,
      })
      .then(({ data }) => {
        addItem(data);
        setValue("");
      });
  };
  return (
    <div>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
      <TextField
        placeholder="Add an item"
        variant="outlined"
        name="itemTitle"
        value={value}
        onChange={handleChange}
        sx={{ width: "85%", marginLeft: "43px", marginTop: 1 }}
      />
      <IconButton onClick={handleCreateItem} edge="end" sx={{ float: "right" }}>
        <AddCircleIcon sx={{ width: "45px", height: "45px" }} />
      </IconButton>
    </div>
  );
};

export default ItemList;
