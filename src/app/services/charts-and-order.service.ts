import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.baseURL}/api/orders`;
  private apiUrl2 = `${environment.baseURL}/api/dashboard/get-details`;

  private dashboard = `${environment.baseURL}/api/dashboard`;
  private adminUrl = `${environment.baseURL}/api/admin`;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    console.log(token);

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
    };
  }

  getAllOrders(): Observable<any> {
    // console.log(this.http.get(`${this.apiUrl2}`, this.getHeaders()));

    return this.http.get(`${this.apiUrl2}`, this.getHeaders());
  }

  updateOrderStatus(
    orderId: string,
    status: { status: string }
  ): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/status/${orderId}`,
      status,
      this.getHeaders()
    );
  }
  getTotalRevenue(): Observable<any> {
    return this.http.get(`${this.dashboard}/total-revenue`, this.getHeaders());
  }
  getUserCount(): Observable<any> {
    return this.http.get(`${this.dashboard}/user-count`, this.getHeaders());
  }
  getRevenueTrends(): Observable<any> {
    return this.http.get(`${this.dashboard}/get-revenue`, this.getHeaders());
  }
  getCategoryProductCounts(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.dashboard}/product-counts`,
      this.getHeaders()
    );
  }

  getAdminDetails(): Observable<any> {
    return this.http.get(
      `${environment.baseURL}/api/auth/profile`,
      this.getHeaders()
    );
  }

  updateAdminProfile(adminData: any): Observable<any> {
    return this.http.patch(
      `${environment.baseURL}/api/dashboard/update-Admin`,
      adminData,
      this.getHeaders()
    );
  }
}
