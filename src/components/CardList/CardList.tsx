import { FC } from "react";
import CardListItem from "../CardListItem";
import { CardListProps } from "./CardList.types";

const CardList: FC<CardListProps> = ({ cards }) => {
  return (
    <div>
      {cards.map((card) => (
        <CardListItem key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardList;
