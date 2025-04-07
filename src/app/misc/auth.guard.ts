import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const path = route.routeConfig?.path;

  if (!authService.loggedinUser) {
    if (path === 'profile' || path === 'admin' || path === 'cart') {
      router.navigate(['login']);
      return false;
    }
    return true;
  }

  if (path === 'admin') {
    return authService.loggedinUser.is_admin === true;
  }
  if (
    path === 'profile' ||
    path === 'cart' ||
    path === 'tickets' ||
    path === 'camping'
  ) {
    return authService.loggedinUser.is_admin === false;
  }

  return true;
};
