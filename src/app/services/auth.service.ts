import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedinUser: UserModel | null = null;

  constructor(private configService: ConfigService, private http: HttpClient) {}

  login(model: { name: string; password: string }): Observable<boolean> {
    return this.http
      .post<UserModel>(`${this.configService.apiUrl}/api/login`, model)
      .pipe(
        map((result: UserModel) => {
          this.loggedinUser = result;
          localStorage.setItem('user', JSON.stringify(result));
          return true;
        }),
      );
  }

  logout() {
    if (this.loggedinUser && this.loggedinUser.token) {
      const header = new HttpHeaders().set(
        'Authorization', 'Bearer ' +
        this.loggedinUser.token
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
    }
  }
}
