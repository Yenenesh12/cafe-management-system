import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getBills(token: string | null): Observable<Bill[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    });

    return this.http.get<Bill[]>(`${this.apiUrl}/getBills`, { headers });
  }


  deleteBill(id: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/deleteBill/${id}`, {});
  }
}
