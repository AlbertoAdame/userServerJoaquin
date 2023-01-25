import { Injectable } from '@angular/core';
import { UsersService } from '../users/services/users.service';
import { Observable, switchMap, of, catchError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../servers/interfaces/token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService:UsersService, private cookies:CookieService, private http:HttpClient) { }

  url:string='http://localhost:8000/auth/login';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  
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

    // const httpHeaderJwt = {
    //   headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.cookies.get('token')})
    // } //Esto en principio hay que preguntar pq ya tengo el interceptor, pero no me va si lo quito
    
    return this.http.get('http://localhost:8000/jwt')
    .pipe( switchMap(token=> {
        return of(true)
    }), catchError (error=>{
      this.cookies.delete('token');
      return of(false)
    }))
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
    return this.http.post<Token>(this.url, {email,password}, this.httpOptions)
    .pipe( switchMap(token=> {
        this.cookies.set('token',  token.access_token);
        this.cookies.set('rol', token.rol)
        return of(true)
    }), catchError (error=>{
      this.cookies.delete('token');
      this.cookies.delete('rol');
      return of(false)
    }))

  }

  logout() {
    // localStorage.setItem('authenticated', 'false')
    this.cookies.delete('token');
  }
}
