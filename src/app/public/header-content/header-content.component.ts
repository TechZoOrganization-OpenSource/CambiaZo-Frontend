import {Component, OnInit} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterModule} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDrawerContainer} from "@angular/material/sidenav";
import {MatDialog} from "@angular/material/dialog";
import {DialogLoginRegisterComponent} from "../components/dialog-login-register/dialog-login-register.component";
import {LoginComponent} from "../../content/pages/login/login.component";
import {NgIf} from "@angular/common";
import {UsersService} from "../../content/service/users/users.service";

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
    MatSidenavModule,
    NgIf
  ],
  templateUrl: './header-content.component.html',
  styleUrl: './header-content.component.css'
})
export class HeaderContentComponent implements OnInit{
  userValidation = false
  constructor(private router:Router,private dialogLoginRegister: MatDialog,public userService:UsersService){
  }
  ngOnInit() {
    this.checkToken()
  }

  checkToken(){
    const token = localStorage.getItem('token');
    if(token){this.userService.isLogged = true}
  }

  onCallCreatePost(){
    if(this.userService.isLogged)this.router.navigateByUrl('home/post');
    else this.dialogLoginRegister.open(DialogLoginRegisterComponent,{disableClose: true})
  }

}
