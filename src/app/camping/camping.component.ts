import { Component, OnInit } from '@angular/core';
import { CampingModel } from '../models/camping.model';
import { CommonModule } from '@angular/common';
import { CampingService } from '../services/camping.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-camping',
  imports: [CommonModule],
  templateUrl: './camping.component.html',
  styleUrl: './camping.component.css',
})
export class CampingComponent implements OnInit {
  campingSpots: CampingModel[] = [];
  modalVisible = false;
  modalMessage = '';

  constructor(
    private campingService: CampingService,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadCampingSpots();
  }

  loadCampingSpots() {
    this.campingService.getCampingSpots().subscribe((data) => {
      this.campingSpots = data.map((spot) => ({
        ...spot,
        quantity: 0,
      }));
    });
  }

  increaseQuantity(spot: CampingModel) {
    spot.quantity = (spot.quantity || 0) + 1;
    if (spot.quantity > spot.availability) {
      spot.quantity = spot.availability;
    }
  }

  decreaseQuantity(spot: CampingModel) {
    if ((spot.quantity || 0) > 0) {
      spot.quantity = (spot.quantity || 0) - 1;
    }
  }

  addToCart(spot: CampingModel): void {
    if (spot.quantity > 0) {
      if (!this.authService.loggedinUser) {
        this.openModal('A foglaláshoz be kell jelentkezned!');
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 1100);
        return;
      }
      this.cartService.addToCart({ ...spot, cartCategory: 'camping' });
      this.openModal(
        `${spot.quantity} db ${spot.type} camping hely hozzáadva a kosárhoz!`
      );
      spot.quantity = 0;
    }
  }

  openModal(message: string) {
    this.modalMessage = message;
    this.modalVisible = true;
    setTimeout(() => {
      this.modalVisible = false;
      this.modalMessage = '';
    }, 1100);
  }
}
