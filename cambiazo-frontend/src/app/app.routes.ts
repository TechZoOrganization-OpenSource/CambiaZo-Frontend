import { Routes } from '@angular/router';
import {HomeComponent} from "./content/pages/home/home.component";
import{DonationsComponent} from "./content/pages/donations/donations.component";
import {PostComponent} from "./content/pages/post/post.component";

export const routes: Routes = [
  {path:'home',component: HomeComponent},
  {path:'donations',component: DonationsComponent},
  {path:'home/post',component:PostComponent},
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'**',pathMatch:'full',redirectTo:'home'}
];
