import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'**',pathMatch:'full',redirectTo:'home'}
];

