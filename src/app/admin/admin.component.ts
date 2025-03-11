import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampingService } from '../services/camping.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  activeTab: string = 'camping';

  campingSpots: any[] = [];
  newCamping = {
    type: '',
    price: 0,
    availability: 0,
  };

  tickets: any[] = [];
  newTicket = {
    type: '',
    price: 0,
    availability: 0,
  };

  constructor(
    private campingService: CampingService,
    private ticketService: TicketService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAdmin();
    this.loadCampingSpots();
    this.loadTickets();
  }

  checkAdmin() {
    if (this.authService.loggedinUser?.is_admin !== true) {
      this.router.navigate(['login']);
    }
  }

  loadCampingSpots() {
    this.campingService.getCampingSpots().subscribe((data) => {
      this.campingSpots = data;
    });
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe((data) => {
      this.tickets = data;
    });
  }

  addCamping() {
    if (
      !this.newCamping.type ||
      this.newCamping.price <= 0 ||
      this.newCamping.availability < 0
    ) {
      alert('Kérlek töltsd ki az összes mezőt helyesen!');
      return;
    }

    this.campingService.addCampingSpot(this.newCamping).subscribe(
      () => {
        alert('Camping sikeresen hozzáadva!');
        this.loadCampingSpots();
        this.newCamping = { type: '', price: 0, availability: 0 };
      },
      (error) => {
        console.error('Hiba történt:', error);
        alert('Hiba történt a camping hozzáadásakor.');
      }
    );
  }

  deleteCamping(id: number) {
    this.campingService.deleteCampingSpot(id).subscribe(
      () => {
        alert('Camping sikeresen törölve!');
        this.campingSpots = this.campingSpots.filter((spot) => spot.id !== id);
      },
      (error) => {
        console.error('Hiba történt:', error);
        alert('Hiba történt a törlés során.');
      }
    );
  }

  addTicket() {
    if (
      !this.newTicket.type ||
      this.newTicket.price <= 0 ||
      this.newTicket.availability < 0
    ) {
      alert('Kérlek töltsd ki az összes mezőt helyesen!');
      return;
    }

    this.ticketService.addTicket(this.newTicket).subscribe(
      () => {
        alert('Jegy sikeresen hozzáadva!');
        this.loadTickets();
        this.newTicket = { type: '', price: 0, availability: 0 };
      },
      (error: any) => {
        console.error('Hiba történt:', error);
        alert('Hiba történt a jegy hozzáadásakor.');
      }
    );
  }

  deleteTicket(id: number) {
    this.ticketService.deleteTicket(id).subscribe(
      () => {
        alert('Jegy sikeresen törölve!');
        this.tickets = this.tickets.filter((ticket) => ticket.id !== id);
      },
      (error: any) => {
        console.error('Hiba történt:', error);
        alert('Hiba történt a törlés során.');
      }
    );
  }
}
