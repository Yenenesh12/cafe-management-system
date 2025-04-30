import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'your-api-url'; // <-- Change this to your real API URL

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  updateUserStatus(user: { id: number; status: boolean }): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${user.id}/status`, user);
  }
}
