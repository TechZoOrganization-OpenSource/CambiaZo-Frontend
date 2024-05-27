import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-detail-ong',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './detail-ong.component.html',
  styleUrl: './detail-ong.component.css'
})
export class DetailOngComponent {
  @Input() ong:any;
  constructor(){

  }


}
