import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TicketModel } from '../models/ticket.model';

@Component({
  selector: 'app-tickets',
  imports: [CommonModule],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent {
  tickets: TicketModel[] = [
    { id: 1, type: 'Standard', price: 5000, availability: 10, quantity: 0 },
    { id: 2, type: 'VIP', price: 10000, availability: 5, quantity: 0 },
  ];

  increaseQuantity(ticket: TicketModel): void {
    if (ticket.quantity < ticket.availability) {
      ticket.quantity++;
    }
  }

  decreaseQuantity(ticket: TicketModel): void {
    if (ticket.quantity > 0) {
      ticket.quantity--;
    }
  }

  buyTicket(ticket: TicketModel): void {
    if (ticket.quantity > 0) {
      alert(`${ticket.quantity} db ${ticket.type} jegyet vásároltál!`);
      ticket.availability -= ticket.quantity;
      ticket.quantity = 0;
    }
  }

  getTickets() {
    return this.tickets;
  }
}
