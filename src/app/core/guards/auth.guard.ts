import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private toastr:ToastrService) { }
  /**
   * CanActivate guard to check if the user is authenticated.
   * @param route Activated route snapshot
   * @param state Router state snapshot
   * @returns boolean indicating if the route can be activated
   */
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
   const token = localStorage.getItem('token');
    const url = state.url;

    // ✅ Case 1: Navigating to login → always clear token
    if (url == '/login') {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');


      if (token) {
        // If token exists, redirect to profile (already logged in)
        this.router.navigate(['/profile']);
        return false;
      }

      return true;
    }

    // ✅ Case 2: For other routes → check token
    if (token) {
      return true;
    }

    // Not logged in → redirect to login
    this.router.navigate(['/login']);
    return false;
  
  }

}
