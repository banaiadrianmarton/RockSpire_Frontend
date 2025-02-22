import { Component } from '@angular/core';
import { CampingModel } from '../models/camping.mode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-camping',
  imports: [CommonModule],
  templateUrl: './camping.component.html',
  styleUrl: './camping.component.css',
})
export class CampingComponent {
  campingSpots: CampingModel[] = [
    {
      id: 1,
      type: 'Lakókocsi hely',
      price: 5000,
      availability: 10,
      quantity: 0,
    },
    { id: 2, type: 'Sátorhely', price: 3000, availability: 20, quantity: 0 },
    { id: 3, type: 'Glamping', price: 10000, availability: 5, quantity: 0 },
  ];

  increaseQuantity(spot: CampingModel) {
    if (spot.quantity < spot.availability) {
      spot.quantity++;
    }
  }

  decreaseQuantity(spot: CampingModel) {
    if (spot.quantity > 0) {
      spot.quantity--;
    }
  }

  bookSpot(spot: CampingModel) {
    if (spot.quantity > 0 && spot.quantity <= spot.availability) {
      spot.availability -= spot.quantity;
      alert(`${spot.quantity} db ${spot.type} foglalva!`);
      spot.quantity = 0;
    }
  }
}
