import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedinUser: UserModel | null = null;

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
    private router: Router
  ) {
    const user = localStorage.getItem('user');
    if (user) {
      this.loggedinUser = JSON.parse(user);
    }
  }

  getToken(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : null;
  }

  login(model: { name: string; password: string }): Observable<boolean> {
    return this.http
      .post<{ user: UserModel; token: string }>(
        `${this.configService.apiUrl}/api/login`,
        model
      )
      .pipe(
        map((result) => {
          if (result && result.user) {
            this.loggedinUser = {
              id: result.user.id,
              name: result.user.name,
              email: result.user.email,
              is_admin: !!result.user.is_admin,
              token: result.token,
              password: result.user.password,
              passwordConfirm: result.user.passwordConfirm,
            };

            localStorage.setItem('user', JSON.stringify(this.loggedinUser));
            return true;
          }
          return false;
        })
      );
  }

  logout() {
    if (this.loggedinUser && this.loggedinUser.token) {
      const header = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.loggedinUser.token
      );
      this.loggedinUser = null;
      localStorage.removeItem('user');
      this.http
        .post(
          `${this.configService.apiUrl}/api/logout`,
          {},
          { headers: header }
        )
        .subscribe();
      this.router.navigate(['/login']);
    }
  }

  register(model: {
    name: string;
    email: string;
    password: string;
    confirmedPassword: string;
  }): Observable<boolean> {
    return this.http
      .post<UserModel>(`${this.configService.apiUrl}/api/register`, {
        name: model.name,
        email: model.email,
        password: model.password,
        password_confirmation: model.confirmedPassword,
      })
      .pipe(
        map((result: UserModel) => {
          return !!result;
        })
      );
  }
}
