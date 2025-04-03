import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { BandModel } from '../models/band.model';

@Injectable({
  providedIn: 'root',
})
export class BandService {
  private apiUrl = 'http://127.0.0.1:8000/api/bands';

  constructor(private authService: AuthService, private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getBands(): Observable<BandModel[]> {
    return this.http.get<BandModel[]>(this.apiUrl);
  }

  getBand(id: number): Observable<BandModel> {
    return this.http.get<BandModel>(`${this.apiUrl}/${id}`);
  }

  createBand(bandData: BandModel): Observable<any> {
    return this.http.post(this.apiUrl, bandData, {
      headers: this.getHeaders(),
    });
  }

  updateBand(id: number, bandData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, bandData, {
      headers: this.getHeaders(),
    });
  }

  deleteBand(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
