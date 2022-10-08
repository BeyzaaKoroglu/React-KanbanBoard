import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { LoginFormValuesProps } from "../components/LoginForm/LoginForm.types";
import { useLoginContext } from "../contexts/LoginContext/LoginContext";
import { auth } from "../services/endpoints/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useLoginContext();
  const handleLogin = (values: LoginFormValuesProps) => {
    auth
      .login(values)
      .then(({ data }) => {
        login(data.token, data.username, data.id);
        navigate("/");
      })
      .catch((error) => alert(error.response.data));
  };
  return <LoginForm onLogin={handleLogin} />;
};

export default LoginPage;
