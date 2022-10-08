import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { RegisterFormValuesProps } from "../components/RegisterForm/RegisterForm.types";
import { useLoginContext } from "../contexts/LoginContext/LoginContext";
import { auth } from "../services/endpoints/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useLoginContext();
  const handleRegister = (values: RegisterFormValuesProps) => {
    auth
      .register(values)
      .then(({ data }) => {
        login(data.token, data.username, data.id);
        navigate("/");
      })
      .catch((error) =>
        alert(
          typeof error.response.data === "string"
            ? error.response.data
            : "Invalid Credentials"
        )
      );
  };

  return <RegisterForm onRegister={handleRegister} />;
};

export default RegisterPage;
