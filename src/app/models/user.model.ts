export interface UserModel {
  id: number;
  role: string[];
  username: string;
  email: string;
  password: string;
  validTo: Date;
  token: string;
}
