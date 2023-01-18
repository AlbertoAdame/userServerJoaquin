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

// El método login es lo que deberemos editar para jwt

  // login(email:string, password:string):Observable<boolean> {
  //   //Recuperamos el usuario y comprobamos que la contraseña sea correcta
  //   return this.userService.getUserByEmail(email)
  //   .pipe( switchMap((user=> {
  //     if (user.length && user[0].password===password){
  //       localStorage.setItem('authenticated', 'true');
  //       localStorage.setItem('rol',user[0].rol)
  //       return of(true)
  //     }
  //     else{
  //       localStorage.setItem('authenticated', 'false');
  //       return of(false)
  //     }
  //   })))
  // }


  login(email:string, password:string):Observable<boolean> {
    //Recuperamos el usuario y comprobamos que la contraseña sea correcta
    return this.userService.getToken(email,password)
    .pipe( switchMap((token=> {
      if (token.access_token!=""){
        localStorage.setItem('Authorization', "Bearer " + token.access_token);
        // localStorage.setItem('rol',user[0].rol)
        return of(true)
      }
      else{
        localStorage.setItem('Authorization', '');
        return of(false)
      }
    })))
  }

  logout() {
    localStorage.setItem('authenticated', 'false')
    localStorage.removeItem('rol');
  }
}
