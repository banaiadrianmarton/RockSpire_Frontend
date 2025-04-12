import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  model = {
    name: '',
    email: '',
    password: '',
    confirmedPassword: '',
  };

  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.model.name || !this.model.email || !this.model.password) {
      this.errorMessage = 'Minden mező kitöltése kötelező!';
      return;
    }
    this.authService.register(this.model).subscribe({
      next: (successful: boolean) => {
        if (successful) {
          this.successMessage = 'Sikeres regisztráció! Most bejelentkezhetsz.';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        } else {
          this.errorMessage = 'A regisztráció sikertelen.';
        }
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message ?? 'Hiba történt!';
      },
    });
  }
}
