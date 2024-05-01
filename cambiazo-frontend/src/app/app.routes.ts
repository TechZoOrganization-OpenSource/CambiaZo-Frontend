import { Routes } from '@angular/router';
import {HomeComponent} from "./content/pages/home/home.component";
import{DonationsComponent} from "./content/pages/donations/donations.component";
import {PostComponent} from "./content/pages/post/post.component";
import {MembershipsComponent} from "./content/pages/memberships/memberships.component";
import {TermsOfUseComponent} from "./content/pages/terms-of-use/terms-of-use.component";
import {PrivacyPolicyComponent} from "./content/pages/privacy-policy/privacy-policy.component";
import{LoginComponent} from "./content/pages/login/login.component";
import {RegisterComponent} from "./content/pages/register/register.component";
import {ContactComponent} from "./content/pages/contact/contact.component";
import {AssistComponent} from "./content/pages/assist/assist.component";

export const routes: Routes = [
  {path:'home',component: HomeComponent},
  {path:'donations',component: DonationsComponent},
  {path:'home/post',component:PostComponent},
  {path:'memberships', component:MembershipsComponent},
  {path:'terms-of-use', component: TermsOfUseComponent},
  {path:'privacy-policy', component: PrivacyPolicyComponent},
  {path:'login',component: LoginComponent },
  {path:'register',component: RegisterComponent },
  {path:'contact', component: ContactComponent},
  {path:'help', component: AssistComponent},
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'**',pathMatch:'full',redirectTo:'home'}
];
