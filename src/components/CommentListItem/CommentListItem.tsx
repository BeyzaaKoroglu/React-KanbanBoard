import {
  Box,
  Card,
  CardContent,
  Tooltip,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { FC, useState } from "react";
import { CommentListItemProps } from "./CommentListItem.types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { comment as commentService } from "../../services/endpoints/comment";
import { useCardContext } from "../../contexts/CardContext/CardContext";

const style = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1.5,
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: "background.paper",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
};

const CommentListItem: FC<CommentListItemProps> = ({ comment }) => {
  const { deleteComment } = useCardContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleDelete = () => {
    commentService.destroy(comment.id).then(({ data }) => {
      deleteComment(comment.id);
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AccountCircleIcon fontSize="large" sx={{ m: 3, marginRight: 1 }} />
      <Card variant="outlined" sx={{ minWidth: 250, m: 1, p: 0 }}>
        <CardContent>
          <Typography variant="h6">
            {comment.author?.username}
            <Tooltip title="Comment settings">
              <IconButton
                onClick={(event) => setAnchorEl(event.currentTarget)}
                size="small"
                edge="end"
                sx={{ float: "right" }}
                aria-controls={openMenu ? "list-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
              >
                <MoreIcon sx={{ width: 24, height: 24 }} />
              </IconButton>
            </Tooltip>
          </Typography>
          <Typography sx={{ marginTop: 1 }}>{comment.message}</Typography>
          <Menu
            anchorEl={anchorEl}
            id="list-menu"
            open={openMenu}
            onClose={() => setAnchorEl(null)}
            onClick={() => setAnchorEl(null)}
            PaperProps={{
              elevation: 0,
              sx: style,
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleDelete}>Delete Comment</MenuItem>
          </Menu>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CommentListItem;
