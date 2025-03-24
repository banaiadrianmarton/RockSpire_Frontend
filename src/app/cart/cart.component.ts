import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { TicketService } from '../services/ticket.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../models/cart.model';
import { CampingService } from '../services/camping.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private ticketService: TicketService,
    private campingService: CampingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
    this.cartService.updateItem(item);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateItem(item);
    } else {
      this.cartService.removeItem(item);
    }
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('A kosár üres!');
      return;
    }

    const userId = this.authService.loggedinUser?.id;
    if (!userId) {
      alert('Be kell jelentkezned a rendelés leadásához!');
      return;
    }

    const ticketItems = this.cartItems
      .filter((item) => item.cartCategory === 'ticket')
      .map((item) => ({
        ticket_id: item.id,
        quantity: item.quantity,
      }));

    const campingItems = this.cartItems
      .filter((item) => item.cartCategory === 'camping')
      .map((item) => ({
        camping_id: item.id,
        quantity: item.quantity,
      }));

    if (ticketItems.length > 0) {
      this.ticketService
        .placeTicketOrder({ user_id: userId, tickets: ticketItems })
        .subscribe({
          next: (response) => {
            alert('Jegyrendelés sikeres!');
            this.cartService.clearTicketCart();
          },
          error: (err) => {
            console.error('Hiba a jegyrendelés során:', err);
            alert(
              err.error?.message ||
                'Hiba történt a jegyrendelés során, próbáld újra!'
            );
          },
        });
    }

    if (campingItems.length > 0) {
      this.campingService
        .bookCampingSpot({ user_id: userId, campings: campingItems })
        .subscribe({
          next: (response) => {
            alert('Camping foglalás sikeres!');
            this.cartService.clearCampingCart();
          },
          error: (err) => {
            console.error('Hiba a camping foglalás során:', err);
            alert(
              err.error?.message ||
                'Hiba történt a camping foglalás során, próbáld újra!'
            );
          },
        });
    }
  }
}
