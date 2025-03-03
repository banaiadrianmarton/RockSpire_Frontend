import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampingModel } from '../models/camping.mode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampingService {
  private apiUrl = 'http://127.0.0.1:8000/api/campings';

  constructor(private http: HttpClient) {}

  getCampingSpots(): Observable<CampingModel[]> {
    return this.http.get<CampingModel[]>(this.apiUrl);
  }

  bookCampingSpot(orderData: any): Observable<any> {
    return this.http.post(
      'http://127.0.0.1:8000/api/camping-orders',
      orderData
    );
  }
}
