import { Box, TextField, Typography, Button } from "@mui/material";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useCardContext } from "../../contexts/CardContext/CardContext";
import { useState, ChangeEvent } from "react";
import { comment } from "../../services/endpoints/comment";
import CommentListItem from "../CommentListItem";
import { useLoginContext } from "../../contexts/LoginContext/LoginContext";

const CommentList = () => {
  const { username } = useLoginContext();
  const { selectedCard, addComment } = useCardContext();
  const [value, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    comment
      .create({ cardId: selectedCard.id, message: value })
      .then(({ data }) => {
        data = { ...data, author: { id: data.authorId, username } };
        addComment(data);
        setValue("");
      });
  };

  return (
    <Box sx={{ paddingTop: 4 }}>
      <Typography variant="h6">
        <CommentOutlinedIcon
          fontSize="medium"
          sx={{ marginBottom: "-4px", marginRight: 1 }}
        />
        Comment
      </Typography>
      <AccountCircleIcon
        fontSize="large"
        sx={{ marginRight: 2, marginTop: 2 }}
      />
      <TextField
        multiline
        maxRows="5"
        variant="outlined"
        value={value}
        onChange={handleChange}
        sx={{ width: "90%", marginTop: 1 }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ borderRadius: 5, marginTop: 1, marginLeft: 6 }}
      >
        Save
      </Button>
      {selectedCard.comments.length > 0 && (
        <Box sx={{ paddingTop: 4 }}>
          <Typography variant="h6">
            <CommentOutlinedIcon
              fontSize="medium"
              sx={{ marginBottom: "-4px", marginRight: 1 }}
            />
            Activity
          </Typography>
          {selectedCard.comments.map((comment) => (
            <CommentListItem comment={comment} key={comment.id} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CommentList;
