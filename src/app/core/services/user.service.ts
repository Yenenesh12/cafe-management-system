import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  signup(user: User) {
    return this.http.post(`${environment.apiUrl}/user/Signup`, user);
  }

  getAllUsers() {
    return this.http.get(`${environment.apiUrl}/user/getAllUser`);
  }

  updateUserStatus(user: User) {
    return this.http.post(`${environment.apiUrl}/user/updateUserStatus`, user);
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.http.post(`${environment.apiUrl}/user/changePassword`, {
      OldPassword: oldPassword,
      NewPassword: newPassword
    });
  }

  forgotPassword(email: string) {
    return this.http.post(`${environment.apiUrl}/user/forgotPassword`, { email });
  }
}
