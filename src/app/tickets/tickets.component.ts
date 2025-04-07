import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { TicketModel } from '../models/ticket.model';
import { TicketService } from '../services/ticket.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tickets',
  imports: [CommonModule],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent {
  tickets: TicketModel[] = [];

  constructor(
    private ticketService: TicketService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe({
      next: (data) => {
        this.tickets = data.map((ticket) => ({
          ...ticket,
          quantity: 0,
        }));
      },
      error: (err) => console.error('Hiba a jegyek betöltésekor:', err),
    });
  }

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

  addToCart(ticket: TicketModel): void {
    if (ticket.quantity > 0) {
      if (!this.authService.loggedinUser) {
        this.router.navigate(['login']);
        alert('A foglaláshoz be kell jelentkezned!');
        return;
      }
      this.cartService.addToCart({ ...ticket, cartCategory: 'ticket' });
      alert(`${ticket.quantity} db ${ticket.type} jegy hozzáadva a kosárhoz!`);
      ticket.quantity = 0;
    }
  }

  buyTicket(ticket: TicketModel): void {
    if (ticket.quantity > 0) {
      const orderData = {
        tickets: [
          {
            ticket_id: ticket.id,
            quantity: ticket.quantity,
          },
        ],
      };

      this.ticketService.placeTicketOrder(orderData).subscribe({
        next: (response) => {
          alert(
            `${ticket.quantity} db ${ticket.type} jegyet sikeresen megvásároltál!`
          );
          ticket.availability -= ticket.quantity;
          ticket.quantity = 0;
        },
        error: (err) => {
          console.error('Hiba a jegyvásárlás során:', err);
          alert(
            err.error?.message ||
              'Hiba történt a jegyvásárlás során, próbáld újra!'
          );
        },
      });
    }
  }
}
