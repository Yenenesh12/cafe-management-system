import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactMessage } from '../../shared/models/contact-message.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = environment.apiUrl + '/contact';

  constructor(private http: HttpClient) { }

  // Send a contact message
  sendMessage(message: ContactMessage): Observable<any> {
    return this.http.post(`${this.apiUrl}/sendMessage`, message);
  }

  // Get all messages (Admin only)
  getAllMessages(): Observable<ContactMessage[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<ContactMessage[]>(`${this.apiUrl}/getAllMessages`, { headers });
  }

  // Get message by id (Admin only)
  getMessageById(id: number): Observable<ContactMessage> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<ContactMessage>(`${this.apiUrl}/getMessage/${id}`, { headers });
  }

  // Delete message (Admin only)
  deleteMessage(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete(`${this.apiUrl}/deleteMessage/${id}`, { headers });
  }
}
