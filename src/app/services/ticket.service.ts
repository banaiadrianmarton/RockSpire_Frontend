import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { TicketModel } from '../models/ticket.model';
import { Observable } from 'rxjs';
import { TicketOrderModel } from '../models/ticketorder.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = 'https://bgs.jedlik.eu/fb/backend/api/tickets';
  private orderApiUrl = 'https://bgs.jedlik.eu/fb/backend/api/ticket-orders';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getTickets(): Observable<TicketModel[]> {
    return this.http.get<TicketModel[]>(this.apiUrl);
  }

  addTicket(ticketData: any): Observable<any> {
    return this.http.post(this.apiUrl, ticketData, {
      headers: this.getHeaders(),
    });
  }

  updateTicket(id: number, ticketData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, ticketData, {
      headers: this.getHeaders(),
    });
  }

  deleteTicket(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  getUserTicketOrders(userId: number): Observable<TicketOrderModel[]> {
    return this.http.get<TicketOrderModel[]>(`${this.orderApiUrl}/${userId}`, {
      headers: this.getHeaders(),
    });
  }

  placeTicketOrder(orderData: any): Observable<any> {
    return this.http.post(this.orderApiUrl, orderData, {
      headers: this.getHeaders(),
    });
  }
}
