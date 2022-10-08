import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import instance from "../../services/instance";
import { ContextType, StateType } from "./types";

const initialState: StateType = {
  isLoggedIn: Boolean(localStorage.getItem("token")),
  token: localStorage.getItem("token") || "",
  username: localStorage.getItem("username") || "",
  id: Number(localStorage.getItem("id")) || -1,
};

export const LoginContext = createContext<ContextType>({
  login: (token: string, username: string, id: number) => {},
  logout: () => {},
  state: initialState,
});

export const LoginProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<StateType>(initialState);

  useEffect(() => {
    instance.interceptors.request.use((config) => {
      const _config = { ...config };
      _config.headers = {
        ...config.headers,
        authorization: "Bearer " + state.token,
      };
      return _config;
    });
  }, [state.token]);

  const login = (token: string, username: string, id: number) => {
    setState({
      id,
      username,
      token,
      isLoggedIn: true,
    });

    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("id", String(id));
  };

  const logout = () => {
    setState({
      id: -1,
      username: "",
      token: "",
      isLoggedIn: false,
    });
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    localStorage.setItem("id", "-1");
  };

  const values = {
    state,
    login,
    logout,
  };

  return (
    <LoginContext.Provider value={values}>{children}</LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const { state, login, logout } = useContext(LoginContext);
  return {
    userId: state.id,
    username: state.username,
    isLoggedIn: state.isLoggedIn,
    login,
    logout,
  };
};
