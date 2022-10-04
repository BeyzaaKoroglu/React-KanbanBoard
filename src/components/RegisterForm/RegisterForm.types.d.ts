export type RegisterFormProps = {
  onRegister: (values) => void;
};

export type RegisterFormValuesProps = {
  username: string;
  password: string;
  passwordConfirm: string;
};
