import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {NgClass, NgForOf} from "@angular/common";
import {MembershipsService} from "../../service/memberships/memberships.service";
import {Memberships} from "../../model/memberships/memberships.model";
import {UsersService} from "../../service/users/users.service";
import {DialogLoginRegisterComponent} from "../../../public/components/dialog-login-register/dialog-login-register.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-memberships',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf,
    NgClass
  ],
  templateUrl: './memberships.component.html',
  styleUrl: './memberships.component.css'
})
export class MembershipsComponent implements OnInit{

  memberships: Memberships[] = []

  constructor(private membershipsService:MembershipsService,private userService:UsersService,private dialogLoginRegister: MatDialog) {
  }


  ngOnInit() {
    this.getMemberAllMemberships()
  }

  getMemberAllMemberships() {
    this.membershipsService.getMemberships().subscribe(
      (res:any)=> {
        this.memberships = res
      },error => console.log(error)
    )
  }

  onBuyPlan(){
    if(!this.userService.isLogged)this.dialogLoginRegister.open(DialogLoginRegisterComponent,{disableClose: true})
  }
}
