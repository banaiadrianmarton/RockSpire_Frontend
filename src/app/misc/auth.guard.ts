import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.loggedinUser) {
    if (route.routeConfig?.path == 'admin') {
      return authService.loggedinUser.is_admin == true;
    } else {
      if (route.routeConfig?.path == 'profile') {
        return authService.loggedinUser.is_admin == false;
      }
    }
  }
  return true;
};
