import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampingService } from '../services/camping.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { BandModel } from '../models/band.model';
import { BandService } from '../services/band.service';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  activeTab: string = 'camping';

  deleteConfirmOpen: boolean = false;
  deleteTarget: { type: 'camping' | 'ticket' | 'band'; id: number } | null =
    null;

  campingSpots: any[] = [];
  newCamping = {
    type: '',
    price: 0,
    description: '',
    availability: 0,
  };

  tickets: any[] = [];
  newTicket = {
    type: '',
    price: 0,
    description: '',
    availability: 0,
    day_id: null,
  };

  bands: BandModel[] = [];
  newBand: BandModel = {
    name: '',
    image_url: '',
    logo_url: '',
    description: '',
    start_time: '',
    end_time: '',
    day_id: 1,
  };

  editCampingModalOpen: boolean = false;
  editTicketModalOpen: boolean = false;
  editBandModalOpen: boolean = false;

  editingCamping: any = {
    id: null,
    type: '',
    price: 0,
    description: '',
    availability: 0,
  };

  editingTicket: any = {
    id: null,
    type: '',
    price: 0,
    description: '',
    availability: 0,
  };

  editingBand: any = {
    id: null,
    name: '',
    image_url: '',
    logo_url: '',
    description: '',
    start_time: '',
    end_time: '',
    day_id: 1,
  };

  successMessage: string = '';

  constructor(
    private campingService: CampingService,
    private ticketService: TicketService,
    private bandService: BandService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAdmin();
    this.loadCampingSpots();
    this.loadTickets();
    this.loadBands();
  }

  confirmDelete(type: 'camping' | 'ticket' | 'band', id: number) {
    this.deleteConfirmOpen = true;
    this.deleteTarget = { type, id };
  }

  showSuccess(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 1100);
  }

  confirmDeletion() {
    if (!this.deleteTarget) return;

    const { type, id } = this.deleteTarget;

    if (type === 'camping') {
      this.campingService.deleteCampingSpot(id).subscribe(() => {
        this.campingSpots = this.campingSpots.filter((c) => c.id !== id);
        this.showSuccess('Camping sikeresen törölve!');
        this.closeDeleteModal();
      });
    } else if (type === 'ticket') {
      this.ticketService.deleteTicket(id).subscribe(() => {
        this.tickets = this.tickets.filter((t) => t.id !== id);
        this.showSuccess('Jegy sikeresen törölve!');
        this.closeDeleteModal();
      });
    } else if (type === 'band') {
      this.bandService.deleteBand(id).subscribe(() => {
        this.bands = this.bands.filter((b) => b.id !== id);
        this.showSuccess('Zenekar sikeresen törölve!');
        this.closeDeleteModal();
      });
    }
  }

  openEditCampingModal(spot: any) {
    this.editingCamping = { ...spot };
    this.editCampingModalOpen = true;
  }

  openEditTicketModal(ticket: any) {
    this.editingTicket = { ...ticket };
    this.editTicketModalOpen = true;
  }

  openEditBandModal(band: BandModel) {
    this.editingBand = { ...band };
    this.editBandModalOpen = true;
  }

  closeDeleteModal() {
    this.deleteConfirmOpen = false;
    this.deleteTarget = null;
  }

  closeEditBandModal() {
    this.editBandModalOpen = false;
    this.editingBand = {
      id: null,
      name: '',
      image_url: '',
      logo_url: '',
      description: '',
      day_id: 1,
    };
  }

  closeEditCampingModal() {
    this.editCampingModalOpen = false;
    this.editingCamping = {
      id: null,
      type: '',
      price: 0,
      description: '',
      availability: 0,
    };
  }

  closeEditTicketModal() {
    this.editTicketModalOpen = false;
    this.editingTicket = {
      id: null,
      type: '',
      price: 0,
      description: '',
      availability: 0,
    };
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

  addCamping() {
    if (
      !this.newCamping.type ||
      this.newCamping.price <= 0 ||
      this.newCamping.availability < 0
    ) {
      this.showSuccess('Kérlek töltsd ki az összes mezőt helyesen!');
      return;
    }

    this.campingService.addCampingSpot(this.newCamping).subscribe(
      () => {
        this.showSuccess('Camping sikeresen hozzáadva!');
        this.loadCampingSpots();
        this.newCamping = {
          type: '',
          price: 0,
          description: '',
          availability: 0,
        };
      },
      (error) => {
        console.error('Hiba történt:', error);
        this.showSuccess('Hiba történt a camping hozzáadásakor.');
      }
    );
  }

  updateCamping() {
    if (
      !this.editingCamping.type ||
      this.editingCamping.price <= 0 ||
      this.editingCamping.availability < 0
    ) {
      this.showSuccess('Kérlek töltsd ki az összes mezőt helyesen!');
      return;
    }

    this.campingService
      .updateCampingSpot(this.editingCamping.id, this.editingCamping)
      .subscribe(
        (response) => {
          this.showSuccess('Camping sikeresen módosítva!');
          this.loadCampingSpots();
          this.closeEditCampingModal();
        },
        (error) => {
          console.error('Hiba történt a módosítás során:', error);
          this.showSuccess('Hiba történt a camping módosításakor.');
        }
      );
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe((data) => {
      this.tickets = data;
    });
  }

  addTicket() {
    if (
      !this.newTicket.type ||
      this.newTicket.price <= 0 ||
      this.newTicket.availability < 0 ||
      this.newTicket.day_id === null
    ) {
      this.showSuccess('Kérlek töltsd ki az összes mezőt helyesen!');
      return;
    }

    this.ticketService.addTicket(this.newTicket).subscribe(
      () => {
        this.showSuccess('Jegy sikeresen hozzáadva!');
        this.loadTickets();
        this.newTicket = {
          type: '',
          price: 0,
          description: '',
          availability: 0,
          day_id: null,
        };
      },
      (error: any) => {
        console.error('Hiba történt:', error);
        this.showSuccess('Hiba történt a jegy hozzáadásakor.');
      }
    );
  }

  updateTicket() {
    if (
      !this.editingTicket.type ||
      this.editingTicket.price <= 0 ||
      this.editingTicket.availability < 0 ||
      this.editingTicket.day_id === null ||
      this.editingTicket.day_id <= 0
    ) {
      this.showSuccess('Kérlek töltsd ki az összes mezőt helyesen!');
      return;
    }

    this.ticketService
      .updateTicket(this.editingTicket.id, this.editingTicket)
      .subscribe(
        (response) => {
          this.showSuccess('Jegy sikeresen módosítva!');
          this.loadTickets();
          this.closeEditTicketModal();
        },
        (error) => {
          console.error('Hiba történt a módosítás során:', error);
          this.showSuccess('Hiba történt a jegy módosításakor.');
        }
      );
  }

  loadBands() {
    this.bandService.getBands().subscribe((data: BandModel[]) => {
      this.bands = data;
    });
  }

  addBand(): void {
    this.bandService.createBand(this.newBand).subscribe({
      next: (response) => {
        console.log('Sikeres mentés:', response);
        this.loadBands();
        this.showSuccess('Zenekar sikeresen hozzáadva!');
        this.newBand = {
          name: '',
          image_url: '',
          logo_url: '',
          description: '',
          start_time: '',
          end_time: '',
          day_id: 1,
        };
      },
      error: (error) => {
        console.error('Hiba történt:', error);
        this.showSuccess('Hiba történt a zenekar hozzáadásakor.');
      },
    });
  }

  updateBand(): void {
    if (
      !this.editingBand.id ||
      !this.editingBand.name ||
      !this.editingBand.logo_url ||
      !this.editingBand.description ||
      this.editingBand.day_id <= 0
    ) {
      this.showSuccess('Kérlek töltsd ki az összes mezőt helyesen!');
      return;
    }

    this.bandService
      .updateBand(this.editingBand.id, this.editingBand)
      .subscribe(
        (response) => {
          this.showSuccess('Zenekar sikeresen módosítva!');
          this.loadBands();
          this.closeEditBandModal();
        },
        (error) => {
          console.log(this.editingBand);
          console.error('Hiba történt a módosítás során:', error);
          if (error.status === 404) {
            this.showSuccess(
              'A zenekar nem található, próbálj meg egy létező azonosítót használni.'
            );
          } else {
            this.showSuccess('Hiba történt a módosítás során.');
          }
        }
      );
  }
}
