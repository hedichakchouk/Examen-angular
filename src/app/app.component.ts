 import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
   templateUrl: './app.component.html',
  styleUrls:  ['./app.component.css']
})
export class AppComponent {
  title = 'students-management';
}
