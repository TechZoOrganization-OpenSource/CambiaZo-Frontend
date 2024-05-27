import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FooterContent2Component} from "../../../public/footer-content-2/footer-content-2.component";
import {UsersService} from "../../service/users/users.service";
import {Users} from "../../model/users/users.model";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    RouterLinkActive,
    FooterContent2Component,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private router: Router,private userService: UsersService) { }


  login():void{
    this.userService.login({username:this.username,password:this.password}).subscribe((login:boolean) => {
      if(login)this.router.navigateByUrl('/home')
    })
  }
}
