import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private apiUrl = `${environment.apiUrl}/user`;
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

   deleteUser(id: number): Observable<{ message: string }> {
      return this.http.post<{ message: string }>(`${this.apiUrl}/deleteUser/${id}`, {id});
    }
}
