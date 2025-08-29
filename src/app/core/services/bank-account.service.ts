import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface BankAccount {
  id?: number;
  userId: number;
  accountHolder?: string;
  accountNumber: string;
  balance: number;
}

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  private apiUrl = `${environment.apiUrl}/bankAccount`; // ✅ change port if needed

  constructor(private http: HttpClient) {}

  createAccount(account: BankAccount): Observable<any> {
    return this.http.post(`${this.apiUrl}/createAccount`, account);
  }

  getAccountByUser(userId: number): Observable<BankAccount> {
    return this.http.get<BankAccount>(`${this.apiUrl}/getByUser/${userId}`);
  }
}
