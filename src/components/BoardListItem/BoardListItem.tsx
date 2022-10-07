import { Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";
import { BoardListItemProps } from "./BoardListItem.types";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
import { Styled } from "./BoardListItem.styled";
import { Link } from "react-router-dom";

const BoardListItem: FC<BoardListItemProps> = ({ board }) => {
  return (
    <Styled>
      <Link to={`/board/:${board.id}`}>
        <Card>
          <CardContent sx={{ padding: 3 }}>
            <LeaderboardRoundedIcon fontSize="large" sx={{ marginBottom: 1 }} />
            <Typography variant="h5" component="div">
              {board.title}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Styled>
  );
};

export default BoardListItem;
