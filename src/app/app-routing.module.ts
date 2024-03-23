import {RouterModule, Routes} from '@angular/router';
import {StudentAddComponent} from "./student-add/student-add.component";
import {StudentListComponent} from "./student-list/student-list.component";
import {NgModule} from "@angular/core";
import {AboutPageComponent} from "./about-page/about-page.component";
import {EmploiComponent} from "./emploi/emploi.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

export const routes: Routes = [
  {path: 'list', component: StudentListComponent},
  {path: 'add',   pathMatch: 'full', component: StudentAddComponent},
  {path: '', redirectTo: '/list', pathMatch: 'full'},  {path: "about", pathMatch: 'full', component: AboutPageComponent }
  ,{path: 'emploi', component:EmploiComponent ,  pathMatch: 'full'},{path: 'Dashboard', component:DashboardComponent   ,  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
