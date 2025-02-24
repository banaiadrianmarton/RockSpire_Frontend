export interface UserModel {
  id: number;
  is_admin: boolean;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  token: string;
}
