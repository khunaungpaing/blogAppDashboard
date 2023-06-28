import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategroiesComponent} from "./categroies/categroies.component";
const routes: Routes = [
  {path: '', component: CategroiesComponent},
  {path: 'category', component: CategroiesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
