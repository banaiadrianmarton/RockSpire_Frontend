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
  modalVisible = false;
  modalMessage = '';

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
        this.openModal('A foglaláshoz be kell jelentkezned!');
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 1100);
        return;
      }
      this.cartService.addToCart({ ...ticket, cartCategory: 'ticket' });
      this.openModal(
        `${ticket.quantity} db ${ticket.type} jegy hozzáadva a kosárhoz!`
      );
      ticket.quantity = 0;
    }
  }

  openModal(message: string): void {
    this.modalMessage = message;
    this.modalVisible = true;
    setTimeout(() => {
      this.modalVisible = false;
      this.modalMessage = '';
    }, 1100);
  }
}
