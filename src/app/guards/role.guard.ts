import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

export const roleGuard: CanActivateFn = (route, state) => {
  const roles = route.data['roles'] as string[];
  const authService = inject(AuthService);
  const matSnackBar = inject(MatSnackBar);
  const userRole = authService.getUserRole();

  const router = inject(Router);
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    matSnackBar.open('You must log in to view this page', 'Ok', {
      duration: 5000,
    });
    return false;
  }
  if (roles.some((role) => userRole?.includes(role))) return true;

  router.navigate(['/']);
  matSnackBar.open('You are not authorized to view this page', 'Ok', {
    duration: 5000,
  });
  return false;
};
