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
  const formData = new FormData();
  formData.append('Email',email);      // must match LoginDto property names
  formData.append('Password', password);

  return this.http.post<any>(`${environment.apiUrl}/Login/Login`, formData);
}




  forgotPassword(email: string): Observable<any> {
    const formData = new FormData();
    formData.append('Email', email);

    return this.http.post(`${environment.apiUrl}/Login/Forgot`, formData);
  }

  // login(email: string, password: string): Observable<any> {
  //   return this.http.post<any>(`${environment.apiUrl}/Login/Login`, { email, password })
  //     .pipe(map(response => {
  //       if (response?.token) {
  //         localStorage.setItem('token', response.token);
  //         const decodedToken = this.jwtHelper.decodeToken(response.token);

  //         const user: User = {
  //           email: decodedToken.email,
  //           role: decodedToken.role,
  //           token: response.token,
  //           // Add other required user properties here
  //         };

  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //         this.currentUserSubject.next(user);
  //       }
  //       return response;
  //     }));
  // }
  //  Login(email: string, password: string): Observable<any> {
  //   return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
  //     .pipe(map(response => {
  //       if (response?.token) {
  //         localStorage.setItem('token', response.token);
  //         const decodedToken = this.jwtHelper.decodeToken(response.token);

  //         const user: User = {
  //           email: decodedToken.email,
  //           role: decodedToken.role,
  //           token: response.token,
  //           // Add other required user properties here
  //         };

  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //         this.currentUserSubject.next(user);
  //       }
  //       return response;
  //     }));
  // }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  checkToken(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/checkToken`);
  }

//  isAdmin(): boolean {
//   const user = this.currentUserValue;
//   return user?.roleName?.toLowerCase() === 'admin';
// }
setCurrentUser(user: User) {
  this.currentUserSubject.next(user);
}

isAdmin(): boolean {
  return this.currentUserValue?.roleName?.toLowerCase() === 'admin';
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
