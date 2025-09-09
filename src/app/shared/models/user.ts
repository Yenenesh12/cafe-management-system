// export interface User  {
//   id?: number;
//   name?: string;
//   email?: string;
//   password?: string;
//   contactNumber?: string;
//   status?: boolean;
//   role?: string;
//   token?: string;
// }
export interface UserView {
    email : string ;
    userId : string ;
    // id:string;
    // userName:string ;
    // currentDate: string;
    // currentDateET: string;
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
// export interface UserDto {
//   id: string;
//   fullName: string;
//   email: string;
//   contactNumber: string;
//   roleName: string;
//   isActive: boolean;
// }

// export interface UserCreateDto {
//   fullName: string;
//   email: string;
//   contactNumber: string;
//   username: string;
//   password: string;
//   roleName?: string;
// }
export interface UserCreateDto {
  // Id?: string;                  // optional
  FullName?: string;
  Email?: string;
  ContactNumber?: string;
  Username?: string;
  Password?: string;
  RoleName?: string;             // Optional, e.g., admin/user
  Photo?: File;                 // Optional file upload
}


export interface UpdateUserDto {
  id: string;
  fullName?: string;
  contactNumber?: string;
  roleName?: string;
  isActive?: boolean;
}

export interface ResponseMessage {
  success: boolean;
  message: string;
}
export interface User {
    Id? :String ;// PK
    FullName? :string;
    Email? :string;
    ContactNumber? :string;
    Username? :string;
    PasswordHash? :string; // hashed password
    RoleId? :string; // FK -> Role
    // Role : Role ;
    roleName?: string;
    token?: string;
    IsActive? :boolean; // admin approval
    //  DateTime CreatedAt
    PhotoPath? :string;
}
export interface UserDto {
  id: string;               // required for approval
  fullName?: string;
  email?: string;
  contactNumber?: string;
  username?: string;
  password?: string;
  roleName?: string;
  photo?: File | null;
  isActive? :boolean; // admin approval
        // for file uploads
}
// export interface User {
//   id: string;               // Guid
//   fullName: string;
//   email: string;
//   contactNumber: string;
//   username: string;
//   passwordHash?: string;    // hashed password (optional, usually not exposed to frontend)
//   roleId: number;
//   role?: Role;              // optional if you want the full role object
//   isActive: boolean;
//   createdAt: string;        // ISO date string
//   photoPath?: string;
//   token?: string;     // URL or file path
// }
