import {Component, NgZone} from '@angular/core';
import {AuthService} from "../../Services/AuthService";
import {Router} from "@angular/router";
import {MatCard, MatCardActions, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatIcon
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private  AuthS :AuthService , private router:Router ,private ngZone:NgZone ) {
  }

  signin() {
    this.AuthS.doGoogleLogin().then(()=> {
      this.succesRedirect();
    })
  }

  succesRedirect(): void {
    this.ngZone.run(()=>{  this.router.navigate(['/list'])
    })


  }

}
