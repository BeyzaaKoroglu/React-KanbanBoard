import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useLoginContext } from "../../contexts/LoginContext/LoginContext";
import { Styled } from "./Header.styled";

const Header = () => {
  const { username, logout } = useLoginContext();
  const handleLogout = () => {
    logout();
  };

  return (
    <Styled>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kanban Board App
          </Typography>
          <Typography>
            {username}
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Styled>
  );
};

export default Header;
