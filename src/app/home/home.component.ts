import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
          Swal.fire({
            title: '! Parece que algo ha fallado !',
            text: 'Usuario o contraseña incorrectas',
            width: 900,
            padding: '3em',
            color: '#716add',
            background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://sweetalert2.github.io/images/nyan-cat.gif")
              left top
              no-repeat
            `
          })
          // confirm('Email o contraseña incorrectos');
        }
      }
    })
  }

}
