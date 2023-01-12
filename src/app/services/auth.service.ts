import { Injectable } from '@angular/core';
import { UsersService } from '../users/services/users.service';
import { Observable, switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService:UsersService) { }

  loggedIn = false;

  isAuthenticated() {
    // const promise = new Promise(
    //   (resolve, reject) => {
    //     setTimeout(() => {
    //       resolve(this.loggedIn);
    //     }, 800);
    //   }
    // );
    // return promise;
    return localStorage.getItem('authenticated')==='true'
  }

  login(email:string, password:string):Observable<boolean> {
    //Recuperamos el usuario y comprobamos que la contraseña sea correcta
    return this.userService.getUserByEmail(email)
    .pipe( switchMap((user=> {
      if (user.length && user[0].password===password){
        localStorage.setItem('authenticated', 'true');
        return of(true)
      }
      else{
        localStorage.setItem('authenticated', 'false');
        return of(false)
      }
    })))
  }

  logout() {
    localStorage.setItem('authenticated', 'false')
  }
}
