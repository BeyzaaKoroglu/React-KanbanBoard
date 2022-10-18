import { CardType } from "../../services/endpoints/card/types";
import { CommentType } from "../../services/endpoints/comment/types";

export type CardListItemProps = {
  card: CardType;
  index: number;
};

export type NewValues = {
  title: string;
  description: string;
  duedate: Date | undefined;
};
