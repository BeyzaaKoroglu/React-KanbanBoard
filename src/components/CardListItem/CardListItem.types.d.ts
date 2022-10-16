import { CommentType } from "../../services/endpoints/comment/types";

export type CardListItemProps = {
  card: CardType;
  index: number;
};

export type CardType = {
  id: number;
  title: string;
  listId: number;
  updatedAt: string;
  createdAt: string;
  description: string;
  duedate: Date | undefined;
  order?: number;
  checklists?: Array<{
    items: Array<any>;
  }>;
  labels?: Array<{
    color: string;
  }>;
  comments?: Array<CommentType>;
};

export type NewValues = {
  title: string;
  description: string;
  duedate: Date | undefined;
};
