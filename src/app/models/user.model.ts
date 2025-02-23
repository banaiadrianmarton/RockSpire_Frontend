export interface UserModel {
  id: number;
  role: string[];
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  token: string;
}
