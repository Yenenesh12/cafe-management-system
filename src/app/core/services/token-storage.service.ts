import { Injectable } from '@angular/core';
// import { UserView } from '../models/user';
import { UserView } from '../../shared/models/user';
const TOKEN_KEY = 'token';
const USER_KEY = 'currentUser';

@Injectable({
  providedIn: 'root'
})



export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  getCurrentUser(): UserView {
    const token = this.getToken();
    var payLoad = JSON.parse(window.atob(token!.split('.')[1]));

    let user: UserView = {
      userId: payLoad.userId,
      email: payLoad.email,
    }
    return user;
  }


  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(window.atob( user!.split('.')[1]));


    }

    return {};
  }
roleMatch(allowedRoles: string[]): boolean {
  const token = this.getToken();
  if (!token) return false;

  try {
    const payload: any = JSON.parse(window.atob(token.split('.')[1]));
    const userRoles: string[] = payload.role
      ? Array.isArray(payload.role)
        ? payload.role
        : [payload.role]
      : [];
    return allowedRoles.some(role => userRoles.includes(role));

  } catch (e) {
    console.error("Invalid token format", e);
    return false;
  }
}

}
