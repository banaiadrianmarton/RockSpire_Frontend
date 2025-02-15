import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tickets',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent {
  tickets = [
    { id: 1, name: 'Különleges', price: 5000 },
    { id: 2, name: 'VIP', price: 7000 },
    { id: 3, name: 'Normál', price: 3000 },
  ];

  getTickets() {
    return this.tickets;
  }

  buyTicket(ticket: any) {
    alert(`Megvásároltad: ${ticket.name} - ${ticket.price} Ft`);
  }
}
