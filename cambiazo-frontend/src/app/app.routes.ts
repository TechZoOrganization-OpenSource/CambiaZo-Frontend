import { Routes } from '@angular/router';
import {HomeComponent} from "./content/pages/home/home.component";
import{DonationsComponent} from "./content/pages/donations/donations.component"
export const routes: Routes = [
  {path:'home',component: HomeComponent},
  {path:'donations',component: DonationsComponent},
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'**',pathMatch:'full',redirectTo:'home'}
];
