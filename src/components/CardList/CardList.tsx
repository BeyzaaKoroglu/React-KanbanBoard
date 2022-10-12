import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import CardListItem from "../CardListItem";
import { CardListProps } from "./CardList.types";

const CardList: FC<CardListProps> = ({ listId, cards }) => {
  return (
    <Droppable droppableId={String(listId)}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {cards.map((card, index) => (
            <CardListItem key={card.id} index={index} card={card} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default CardList;
