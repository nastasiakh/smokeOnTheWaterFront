import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {filter, map} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {decodeJwt} from "jose";

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.token;

  if (!token) {
    router.navigateByUrl('auth/login');
    return false;
  }
  let userData: {email: string, id: number} = decodeJwt(token)

  if (authService.isTokenExpired()) {
    authService.refreshToken()
      .subscribe(() => {
        return true;
      })
  }

  return authService.currentUser$.pipe(
    filter(currentUser => currentUser !== undefined),
    map((currentUser) => {
      if (!currentUser) {
        router.navigateByUrl('auth/login')
      }

      const userRoles = currentUser?.roles?.map(role => role.name)

      if (userRoles === undefined) {
        return false;
      }

      if (userRoles && userRoles.length === 1 && userRoles.includes('client')) {
        router.navigateByUrl('home')
        return false
      }
      return true;
    })
  )
};

