import { Component, OnInit } from '@angular/core';
import { CampingModel } from '../models/camping.mode';
import { CommonModule } from '@angular/common';
import { CampingService } from '../services/camping.service';

@Component({
  selector: 'app-camping',
  imports: [CommonModule],
  templateUrl: './camping.component.html',
  styleUrl: './camping.component.css',
})
export class CampingComponent implements OnInit {
  campingSpots: CampingModel[] = [];

  constructor(private campingService: CampingService) {}

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

  bookSpot(spot: CampingModel) {
    if ((spot.quantity || 0) > 0) {
      const orderData = {
        user_id: 1,
        campings: [
          {
            camping_id: spot.id,
            quantity: spot.quantity,
          },
        ],
      };

      this.campingService.bookCampingSpot(orderData).subscribe(
        (response) => {
          alert(
            `Sikeresen lefoglaltál ${spot.quantity} db ${spot.type} helyet!`
          );
          spot.availability -= spot.quantity || 0;
          spot.quantity = 0;
        },
        (error) => {
          console.error('Foglalás hiba:', error);
        }
      );
    }
  }
}
