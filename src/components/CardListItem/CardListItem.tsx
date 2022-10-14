import { Card, CardContent, Typography, Divider } from "@mui/material";
import { FC, useEffect, useState } from "react";
import CardModal from "../CardModal";
import { card as cardService } from "../../services/endpoints/card";
import { CardListItemProps, NewValues } from "./CardListItem.types";
import Visibility from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Draggable } from "react-beautiful-dnd";
import { useCardContext } from "../../contexts/CardContext/CardContext";

const CardListItem: FC<CardListItemProps> = ({ card, index }) => {
  const { setSelectedCard, updateSelectedCard } = useCardContext();
  const [items, setItems] = useState({ allItems: 0, checkedItems: 0 });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    let allItems = 0;
    let checkedItems = 0;
    card.checklists?.map((checklist) => {
      allItems += checklist.items.length;
      checkedItems += checklist.items.filter(
        (item) => item.isChecked === true
      ).length;
    });
    setItems({ allItems, checkedItems });
  }, [card.checklists]);

  const handleOpen = () => {
    setSelectedCard(card.id);
    setOpenModal(true);
  };

  const handleClose = (newValues: NewValues) => {
    if (newValues.title !== "") {
      cardService.update(card.id, newValues).then(({ data }) => {
        updateSelectedCard(newValues);
      });
    }
    setOpenModal(false);
  };

  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <Card
          sx={{ m: 2 }}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <CardContent onClick={handleOpen}>
            <Typography>{card.title}</Typography>
            {card.duedate && (
              <Typography
                fontSize="14px"
                sx={{
                  float: "left",
                  color: "white",
                  background: "red",
                  m: 1,
                  marginLeft: 0,
                  textAlign: "center",
                  width: 100,
                  borderRadius: "15px",
                }}
              >
                <AccessTimeIcon sx={{ marginTop: "1px", fontSize: "16px" }} />
                {String(card.duedate)}
              </Typography>
            )}
            {items.allItems > 0 && (
              <Typography
                fontSize="14px"
                sx={{
                  float: "left",
                  color: "white",
                  background: "#9e9e9e",
                  m: 1,
                  marginLeft: 0,
                  textAlign: "center",
                  width: 50,
                  borderRadius: "15px",
                }}
              >
                {items.checkedItems}/{items.allItems}
              </Typography>
            )}
          </CardContent>
          <Divider sx={{ width: "100%" }} />
          <CardContent sx={{ p: 1, height: 5 }} onClick={handleOpen}>
            <Visibility color="disabled" fontSize="small" />
          </CardContent>
          <CardModal open={openModal} onClose={handleClose} />
        </Card>
      )}
    </Draggable>
  );
};

export default CardListItem;
