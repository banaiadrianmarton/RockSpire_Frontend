import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CampingOrderModel } from '../models/campingorder.model';
import { CampingService } from '../services/camping.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: UserModel | null = null;
  orders: CampingOrderModel[] = [];

  constructor(
    private authService: AuthService,
    private campingService: CampingService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.loggedinUser;

    if (this.user?.id) {
      this.loadOrders(this.user.id);
    }
  }

  loadOrders(userId: number) {
    this.campingService.getUserOrders(userId).subscribe((orders) => {
      this.orders = orders;
    });
  }
}
