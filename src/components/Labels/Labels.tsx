import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useCardContext } from "../../contexts/CardContext/CardContext";
import { cardLabel } from "../../services/endpoints/card-label";
import { LabelType } from "../../services/endpoints/label/types";

const Labels = () => {
  const { selectedCard, deleteLabel } = useCardContext();

  const handleDelete = (label: LabelType) => {
    if (label.CardLabel)
      cardLabel.destroy(label.CardLabel.id).then(() => {
        deleteLabel(label.id);
      });
  };

  return (
    <Box sx={{ paddingTop: 4 }}>
      <Typography variant="h6" sx={{ marginBottom: 1 }}>
        <LabelOutlinedIcon
          fontSize="medium"
          sx={{ marginBottom: "-4px", marginRight: 1 }}
        />
        Labels
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Labels"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {selectedCard.labels.map((label) => (
                <Box
                  key={label.id}
                  sx={{
                    background: label.color,
                    marginRight: 1,
                    borderRadius: "20px",
                    paddingLeft: 2,
                  }}
                >
                  {label.title}
                  <IconButton onClick={() => handleDelete(label)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Labels;
