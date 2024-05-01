import { Routes } from '@angular/router';
import {HomeComponent} from "./content/pages/home/home.component";
export const routes: Routes = [
  {path:'home',component: HomeComponent},
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'**',pathMatch:'full',redirectTo:'home'}
];
