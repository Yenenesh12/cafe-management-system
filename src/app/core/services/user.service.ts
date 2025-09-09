import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserDto } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private apiUrl = `${environment.apiUrl}/User`;
  constructor(private http: HttpClient) { }

  signup(UserCreateDto: FormData) {
    return this.http.post(`${environment.apiUrl}/User/Signup`, UserCreateDto);
  }

 getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/GetAll`);
  }

  getUserById(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/GetById/${id}`);
  }

 updateUser(UpdateUserDto: FormData): Observable<any> {
  return this.http.put(`${this.apiUrl}/Update`, UpdateUserDto);
}


  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/${id}`);
  }

 approveUser(user: UserDto): Observable<any> {
  // Only create FormData and append values
  const formData = new FormData();
  formData.append('Id', user.id);               // required
  formData.append('IsActive', 'true');         // approve the user
  if (user.fullName) formData.append('FullName', user.fullName);
  if (user.email) formData.append('Email', user.email);
  if (user.contactNumber) formData.append('ContactNumber', user.contactNumber);
  if (user.username) formData.append('Username', user.username);
  if (user.password) formData.append('Password', user.password);
  if (user.roleName) formData.append('RoleName', user.roleName);
  if (user.photo) formData.append('Photo', user.photo);

  return this.updateUser(formData); // ✅ now it is FormData
}


  changePassword(oldPassword: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/ChangePassword`, {
      OldPassword: oldPassword,
      NewPassword: newPassword
    });
  }
}
