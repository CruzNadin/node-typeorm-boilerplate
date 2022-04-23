export interface InterfaceUser {
  id?: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  phone?: string;
  active: boolean;
  photo: string;
  password: string;
  re_password?: string;
}
