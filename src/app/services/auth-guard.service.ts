import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Observable } from "rxjs";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  
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

    if (this.authService.isAuthenticated()){
      return true;
    } else {
      this.router.navigate(['/']);
    }
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isAuthenticated()){
      return true;
    } else {
      this.router.navigate(['/']);
    }
    return false;

}

}
