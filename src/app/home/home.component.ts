import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../servers/interfaces/client.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  email:string=""
  password:string=""

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
  }

  onlogin() {
    this.authService.login(this.email);
  }

  onlogout() {
    this.authService.logout();
  }

  login(){
    this.authService.login(this.email)
    console.log("entra")

    
  }

}
