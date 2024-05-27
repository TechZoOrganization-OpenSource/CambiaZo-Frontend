import { Component,OnInit } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {Ongs} from "../../model/ongs/ongs.model";
import {OngsService} from "../../service/ongs/ongs.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-ong-detail',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    MatIcon,
  ],
  templateUrl: './ong-detail.component.html',
  styleUrl: './ong-detail.component.css'
})
export class OngDetailComponent implements OnInit{

  ong: any;

  constructor(private ongService:OngsService){}

  ngOnInit() {
    this.getOng()
  }

  getOng(){
    this.ongService.getOngById('4').subscribe((res:any)=>{

      this.ong = new Ongs(
        res.name,
        res.type,
        res.information,
        res.projects,
        res.account_number,
        res.address,
        res.category,
        res.email,
        res.contact_number,
        res.attention_schedule,
        res.logo,
        res.website,
        res.social_networks,
        res.id
      )
    })
  }

}
