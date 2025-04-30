import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api/product`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  addNewProduct(product: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}/addNewProduct`, product, { headers: this.getHeaders() });
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllProduct`, { headers: this.getHeaders() });
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getProductByCategory/${categoryId}`, { headers: this.getHeaders() });
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getProductById/${id}`, { headers: this.getHeaders() });
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}/updateProduct`, product, { headers: this.getHeaders() });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/deleteProduct/${id}`, {}, { headers: this.getHeaders() });
  }

  updateProductStatus(product: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}/updateProductStatus`, product, { headers: this.getHeaders() });
  }
}
