import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";
import {AuthService} from "../../Services/AuthService";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatMenuModule, RouterOutlet, FlexModule, ExtendedModule, RouterLink, MatButtonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  User!:any ;
  constructor(private authService:AuthService,private router:Router ) {
    // etape d"extratction de user name et circle account
    this.authService.getUserClaims().then((user)=>{this.User = user })
    // ligne 14 abbi l user
  }

  logout(){
    this.authService.doLogout().then(()=>{
      this.router.navigate([''])
    })
  }
}
