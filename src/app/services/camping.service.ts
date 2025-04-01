import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampingModel } from '../models/camping.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CampingOrderModel } from '../models/campingorder.model';

@Injectable({
  providedIn: 'root',
})
export class CampingService {
  private apiUrl = 'http://127.0.0.1:8000/api/campings';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getCampingSpots(): Observable<CampingModel[]> {
    return this.http.get<CampingModel[]>(this.apiUrl);
  }

  bookCampingSpot(orderData: any): Observable<any> {
    return this.http.post(
      'http://127.0.0.1:8000/api/camping-orders',
      orderData,
      {
        headers: this.getHeaders(),
      }
    );
  }

  addCampingSpot(campingData: any): Observable<any> {
    return this.http.post(this.apiUrl, campingData, {
      headers: this.getHeaders(),
    });
  }

  deleteCampingSpot(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  getUserOrders(userId: number): Observable<CampingOrderModel[]> {
    return this.http.get<CampingOrderModel[]>(
      `http://127.0.0.1:8000/api/camping-orders/${userId}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  updateCampingSpot(id: number, campingData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, campingData, {
      headers: this.getHeaders(),
    });
  }
}
