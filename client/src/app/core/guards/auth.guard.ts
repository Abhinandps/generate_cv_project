/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = window.localStorage.getItem('authToken');
    if (token === null || token === undefined || token.trim() === '') {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
