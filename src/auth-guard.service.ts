import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, ActivatedRoute, Router, CanActivateChild } from '@angular/router';
import { Observable } from "rxjs";
import { AuthService } from './app/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild{
  
  constructor(private authService:AuthService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return this.authService.isAuthenticated()

    // .then(
    //   (authenticated) => {

    //     if (authenticated) {
    //       return true;

    //     } else {
    //       this.router.navigate(['/']);
    //       return false;
    //     }
    //   }
    // );

    return this.authService.isAuthenticated()
    // if(this.authService.isAuthenticated())
    //   return true;
    // } else {
    //   this.router.navigate(['/']);
    // }
    // return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // if (this.authService.isAuthenticated()){
    //   return true;
    // } else {
    //   this.router.navigate(['/']);
    // }
    // return false;

    return this.authService.isAuthenticated()

}

}
