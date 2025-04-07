import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None, // ideiglenesen
})
export class LoginComponent {
  model = {
    name: '',
    password: '',
  };

  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';

    if (!this.model.name || !this.model.password) {
      this.errorMessage = 'Kérem adja meg a felhasználónevet és jelszót!';
      return;
    }

    this.authService.login(this.model).subscribe({
      next: (successful: boolean) => {
        if (!successful) {
          this.errorMessage = 'Hibás bejelentkezési adatok!';
        } else {
          if (this.authService.loggedinUser?.is_admin) {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['profile']);
          }
        }
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message ?? 'Bejelentkezési hiba!';
      },
    });
  }
}
