import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  email:string=""
  password:string="";
  isLoggedIn!:boolean;

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated()
    .subscribe({
      next: (resp) =>{
        if (resp){
          this.isLoggedIn=true;
      }
      else{
        this.isLoggedIn=false;
      }
    }})
    ;
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn=false;
  }

  login():void{
    console.log('Email: ', this.email, 'Password: ', this.password)
    this.authService.login(this.email,this.password)
    .subscribe({
      next: (resp) => {
        if (resp) {
          this.isLoggedIn=true;
          this.router.navigate(['/servers']);
        }
        else {
          this.email=''; 
          this.password='';
          confirm('Email o contraseña incorrectos');
        }
      }
    })
  }

}
