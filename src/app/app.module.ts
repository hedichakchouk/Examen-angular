// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatNativeDateModule } from '@angular/material/core';

 import { StudentListComponent } from './student-list/student-list.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentService } from '../Services/student.service';
import {AppRoutingModule} from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import {FirebaseModule} from "./Firebase.module";
import {LayoutComponent} from "./layout/layout.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDatepickerModule} from "@angular/material/datepicker";

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FirebaseModule,
    LayoutComponent,
    MatTooltipModule
  ],
  providers: [StudentService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
