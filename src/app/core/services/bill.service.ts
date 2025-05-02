import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Bill } from '../../shared/models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private apiUrl = `${environment.apiUrl}/bill`;

  constructor(private http: HttpClient) { }

  generateReport(bill: Bill): Observable<{ uuid: string }> {
    return this.http.post<{ uuid: string }>(`${this.apiUrl}/generatReport`, bill);
  }

  getPdf(uuid: string): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/getPdf`, { uuid }, { responseType: 'blob' });
  }

  getBills() {
    return this.http.get<Bill[]>(`${this.apiUrl}/getBills`);
  }

  deleteBill(id: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/deleteBill/${id}`, {});
  }
}
