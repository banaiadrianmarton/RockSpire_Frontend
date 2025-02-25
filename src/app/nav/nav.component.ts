import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  isMenuOpen = false;
  constructor(public authService: AuthService, private router: Router) {}

  navigateToProfile() {
    this.router.navigate(['profile']);
  }

  logout() {
    this.authService.logout();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
