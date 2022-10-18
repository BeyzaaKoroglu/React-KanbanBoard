import { CardType } from "../../services/endpoints/card/types";

export type CardListProps = {
  cards: Array<CardType>;
  listId: number;
};
