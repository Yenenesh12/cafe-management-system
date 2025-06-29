export interface User  {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  contactNumber?: string;
  status?: boolean;
  role?: string;
  token?: string;
}

export interface ChangePassword {
  OldPassword: string;
  NewPassword: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}
