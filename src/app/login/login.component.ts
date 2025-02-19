import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterOutlet, FormsModule],
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
      this.errorMessage = 'Kérem adja meg az adatokat!';
    } else {
      this.authService.login(this.model).subscribe({
        next: (successful: boolean) => {
          if (!successful) {
            this.errorMessage = 'Váratlan hiba...';
          } else {
            // if (this.authService.loggedinUser?.role.includes('admin')) {
            //   this.router.navigate(['home']);
            // } else if (this.authService.loggedinUser?.role.includes('user')) {
            //   this.router.navigate(['tickets']);
            // } else {
            this.router.navigate(['home']);
          }
        },
        error: (err: any) => {
          console.log(err);
          this.errorMessage = err.error?.message ?? err.message;
        },
      });
    }
  }
}
