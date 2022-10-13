import { Card, CardContent, Typography, Divider } from "@mui/material";
import { FC, useState } from "react";
import CardModal from "../CardModal";
import { card as cardService } from "../../services/endpoints/card";
import { CardListItemProps, NewValues } from "./CardListItem.types";
import Visibility from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Draggable } from "react-beautiful-dnd";
import { useCardContext } from "../../contexts/CardContext/CardContext";

const CardListItem: FC<CardListItemProps> = ({ card, index }) => {
  const { setSelectedCard, updateSelectedCard } = useCardContext();
  const [openModal, setOpenModal] = useState(false);
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
                  color: "white",
                  background: "red",
                  marginTop: 1,
                  textAlign: "center",
                  width: 100,
                  borderRadius: "15px",
                }}
              >
                <AccessTimeIcon sx={{ marginTop: "1px", fontSize: "16px" }} />
                {String(card.duedate)}
              </Typography>
            )}
          </CardContent>
          <Divider />
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
