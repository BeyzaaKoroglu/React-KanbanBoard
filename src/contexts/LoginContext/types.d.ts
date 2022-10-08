export type ContextType = {
  login: (token: string, username: string, id: number) => void;
  logout: () => void;
  state: StateType;
};

export type StateType = {
  isLoggedIn: boolean;
  token: string;
  username: string;
  id: number;
};
