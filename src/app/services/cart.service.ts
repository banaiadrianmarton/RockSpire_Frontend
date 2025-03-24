import { Injectable } from '@angular/core';
import { TicketModel } from '../models/ticket.model';
import { BehaviorSubject } from 'rxjs';
import { CampingModel } from '../models/camping.mode';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cartItems';
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(
    this.getCartItems()
  );
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.updateCartItems();
  }

  private getCartItems(): CartItem[] {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  }

  private updateCartItems(): void {
    const cart = this.getCartItems();
    this.cartItemsSubject.next(cart);
  }

  addToCart(item: CartItem): void {
    const cart = this.getCartItems();
    const existing = cart.find((i) => i.id === item.id && i.type === item.type);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    this.updateCartItems();
  }

  updateCart(cart: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    this.updateCartItems();
  }

  clearCart(): void {
    localStorage.removeItem(this.storageKey);
    this.updateCartItems();
  }

  updateItem(item: CartItem): void {
    const cart = this.getCartItems();
    const index = cart.findIndex(
      (i) => i.id === item.id && i.type === item.type
    );
    if (index !== -1) {
      cart[index] = item;
      localStorage.setItem(this.storageKey, JSON.stringify(cart));
      this.updateCartItems();
    }
  }

  removeItem(item: CartItem): void {
    const cart = this.getCartItems();
    const updatedCart = cart.filter(
      (i) => !(i.id === item.id && i.type === item.type)
    );
    localStorage.setItem(this.storageKey, JSON.stringify(updatedCart));
    this.updateCartItems();
  }

  clearTicketCart(): void {
    const cart = this.getCartItems();
    const updatedCart = cart.filter((item) => item.cartCategory !== 'ticket');
    localStorage.setItem(this.storageKey, JSON.stringify(updatedCart));
    this.updateCartItems();
  }

  clearCampingCart(): void {
    const cart = this.getCartItems();
    const updatedCart = cart.filter((item) => item.cartCategory !== 'camping');
    localStorage.setItem(this.storageKey, JSON.stringify(updatedCart));
    this.updateCartItems();
  }
}
