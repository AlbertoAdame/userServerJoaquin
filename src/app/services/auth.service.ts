import { Injectable } from '@angular/core';
import { UsersService } from '../users/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private usersService:UsersService) { }

  loggedIn = false;

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      }
    );
    return promise;
  }

  login(email:string) {
    this.usersService.getUserByEmail(email)
    .subscribe({
      next: (resp) =>{
          console.log(resp[0])
      },
      error: (error) =>{
        console.log(error)
      }
    })
    // this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
