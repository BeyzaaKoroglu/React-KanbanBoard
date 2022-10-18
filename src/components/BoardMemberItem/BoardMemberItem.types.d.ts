import { UserType } from "../../services/endpoints/auth/types";

export type BoardMemberItemProps = {
  user: UserType;
  isMember: boolean;
};
