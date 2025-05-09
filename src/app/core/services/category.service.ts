import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../shared/models/category.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/catecory`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  addNewCategory(category: Category): Observable<any> {
    return this.http.post(`${this.apiUrl}/addNewCategory`, category, { headers: this.getHeaders() });
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAllCategory`, { headers: this.getHeaders() });
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/deleteCategory/${id}`, {}, { headers: this.getHeaders() });
  }

  updateCategory(category: Category): Observable<any> {
    return this.http.post(`${this.apiUrl}/updateCategory`, category, { headers: this.getHeaders() });
  }
}
