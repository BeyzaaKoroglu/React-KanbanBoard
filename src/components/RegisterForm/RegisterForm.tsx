import {
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Styled } from "./RegisterForm.styled";
import { useState, ChangeEvent, FC } from "react";
import {
  RegisterFormProps,
  RegisterFormValuesProps,
} from "./RegisterForm.types";
import { Link } from "react-router-dom";

const RegisterForm: FC<RegisterFormProps> = (props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [formValues, setFormValues] = useState<RegisterFormValuesProps>({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      formValues.username === "" ||
      formValues.password === "" ||
      formValues.passwordConfirm === ""
    )
      alert("Missing Credentials");
    else props.onRegister(formValues);
  };

  return (
    <Styled>
      <Card>
        <CardContent sx={{ m: 2 }}>
          <Typography gutterBottom variant="h4" component="div">
            Register
          </Typography>
          <TextField
            onChange={handleChange}
            name="username"
            value={formValues.username}
            required
            fullWidth
            label="Name"
            variant="standard"
          />
          <TextField
            onChange={handleChange}
            name="password"
            value={formValues.password}
            required
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
          <TextField
            onChange={handleChange}
            name="passwordConfirm"
            value={formValues.passwordConfirm}
            required
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            Register Now
          </Button>
        </CardContent>
        <Typography sx={{ ml: 5, mb: 5 }}>
          Already have an account {""}
          <Link to="/login">Sign In</Link>
        </Typography>
      </Card>
    </Styled>
  );
};

export default RegisterForm;
