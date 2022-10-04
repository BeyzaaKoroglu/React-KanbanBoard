import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState, ChangeEvent, FC } from "react";
import { Link } from "react-router-dom";
import { Styled } from "./LoginForm.styled";
import { LoginFormProps, LoginFormValuesProps } from "./LoginForm.types";

const LoginForm: FC<LoginFormProps> = (props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<LoginFormValuesProps>({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    props.onLogin(formValues);
  };

  return (
    <Styled>
      <Card>
        <CardContent sx={{ m: 2 }}>
          <Typography gutterBottom variant="h4" component="div">
            Login
          </Typography>
          <TextField
            onChange={handleChange}
            name="username"
            value={formValues.username}
            fullWidth
            label="Username"
            variant="standard"
          />
          <TextField
            onChange={handleChange}
            name="password"
            value={formValues.password}
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 4 }}
          >
            Login Now
          </Button>
        </CardContent>
        <Typography sx={{ ml: 5, mb: 5 }}>
          Don't have an account {""}
          <Link to="/register">Sign Up</Link>
        </Typography>
      </Card>
    </Styled>
  );
};

export default LoginForm;
