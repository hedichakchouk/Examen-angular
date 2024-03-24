import {RouterModule, Routes} from '@angular/router';
import {StudentAddComponent} from "./student-add/student-add.component";
import {StudentListComponent} from "./student-list/student-list.component";
import {NgModule} from "@angular/core";
import {AboutPageComponent} from "./about-page/about-page.component";
import {EmploiComponent} from "./emploi/emploi.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: LoginComponent
  },
  {path: 'list', component: StudentListComponent},
  {path: 'add',   pathMatch: 'full', component: StudentAddComponent},
    {path: "about", pathMatch: 'full', component: AboutPageComponent }
  ,{path: 'emploi', component:EmploiComponent ,  pathMatch: 'full'},{path: 'Dashboard', component:DashboardComponent   ,  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
