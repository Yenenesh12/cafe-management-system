export interface User {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  contactNumber?: string;
  status?: string;
  role?: string;
  token?: string;
}

export interface ChangePassword {
  OldPassword: string;
  NewPassword: string;
}
