import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterModule} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDrawerContainer} from "@angular/material/sidenav";
import {MatDialog} from "@angular/material/dialog";
import {DialogLoginRegisterComponent} from "../components/dialog-login-register/dialog-login-register.component";

@Component({
  selector: 'app-header-content',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatDrawerContainer,
    MatSidenavModule
  ],
  templateUrl: './header-content.component.html',
  styleUrl: './header-content.component.css'
})
export class HeaderContentComponent {
  userValidation = false

  constructor(private router:Router,private dialogLoginRegister: MatDialog) {}

  onCallCreatePost(){
    if(this.userValidation)this.router.navigateByUrl('home/post');
    else{
      this.dialogLoginRegister.open(DialogLoginRegisterComponent,{disableClose: true})
    }
  }

}
