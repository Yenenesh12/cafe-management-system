import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface BankAccount {
  id: number;
  userId: number;
  AccountHolder: string;
  AccountNumber: string;
  Balance: number;
}

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  private apiUrl = `${environment.apiUrl}/bankAccount`; // backend base URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '', // must include 'Bearer '
      'Content-Type': 'application/json'
    });
  }

  // Create account
  createAccount(balance: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/createAccount`, { balance }, { headers: this.getAuthHeaders() });
  }

  // Fetch account of logged-in user
  getAccountByUser(): Observable<BankAccount> {
    return this.http.get<BankAccount>(`${this.apiUrl}/getByUser`, { headers: this.getAuthHeaders() });
  }
}
