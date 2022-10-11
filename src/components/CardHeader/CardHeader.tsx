import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import TodayIcon from "@mui/icons-material/Today";
import { Styled } from "./CardHeader.styled";
import { useState, FC } from "react";
import { CardHeaderProps } from "./CardHeader.types";

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

const CardHeader: FC<CardHeaderProps> = ({
  duedate,
  onChange,
  onDeleteCard,
}) => {
  const [deleteAnchorEl, setDeleteAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const openDeleteMenu = Boolean(deleteAnchorEl);
  const [dateAnchorEl, setDateAnchorEl] = useState<null | HTMLElement>(null);
  const openDateMenu = Boolean(dateAnchorEl);

  const handleDeleteCard = () => {
    onDeleteCard();
  };

  return (
    <Styled>
      <AppBar
        position="static"
        color="transparent"
        sx={{ borderRadius: "20px" }}
      >
        <Toolbar>
          <IconButton
            onClick={(event) => setDateAnchorEl(event.currentTarget)}
            aria-controls={openDateMenu ? "duedate-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openDateMenu ? "true" : undefined}
          >
            <TodayIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton>
            <CheckBoxOutlinedIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton
            onClick={(event) => setDeleteAnchorEl(event.currentTarget)}
            aria-controls={openDeleteMenu ? "list-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openDeleteMenu ? "true" : undefined}
          >
            <MoreIcon sx={{ color: "white" }} />
          </IconButton>
        </Toolbar>
        <Menu
          anchorEl={dateAnchorEl}
          id="duedate-menu"
          open={openDateMenu}
          onClose={() => setDateAnchorEl(null)}
          PaperProps={{
            elevation: 0,
            sx: style,
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <TextField
              fullWidth
              onChange={onChange}
              type="date"
              value={duedate}
              name="duedate"
            />
          </MenuItem>
        </Menu>
        <Menu
          anchorEl={deleteAnchorEl}
          id="list-menu"
          open={openDeleteMenu}
          onClose={() => setDeleteAnchorEl(null)}
          onClick={() => setDeleteAnchorEl(null)}
          PaperProps={{
            elevation: 0,
            sx: style,
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleDeleteCard}>Delete Card</MenuItem>
        </Menu>
      </AppBar>
    </Styled>
  );
};

export default CardHeader;
