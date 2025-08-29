import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    // Initialize with proper null handling
    const storedUser = localStorage.getItem('currentUser');
    const initialUser = storedUser ? JSON.parse(storedUser) as User : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(initialUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/login`, { email, password })
      .pipe(map(response => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
          const decodedToken = this.jwtHelper.decodeToken(response.token);

          const user: User = {
            email: decodedToken.email,
            role: decodedToken.role,
            token: response.token,
            // Add other required user properties here
          };

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return response;
      }));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  checkToken(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/checkToken`);
  }

  isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  // Optional: Add token refresh functionality
  refreshToken(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/refresh-token`, {
      token: this.currentUserValue?.token
    }).pipe(
      map(response => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
          const user = {
            ...this.currentUserValue,
            token: response.token
          } as User;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return response;
      })
    );
  }


}
