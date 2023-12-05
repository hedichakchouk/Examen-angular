import {RouterModule, Routes} from '@angular/router';
import {StudentAddComponent} from "./student-add/student-add.component";
import {StudentListComponent} from "./student-list/student-list.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [{ path: 'list', component: StudentListComponent },
  { path: 'add', component: StudentAddComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
