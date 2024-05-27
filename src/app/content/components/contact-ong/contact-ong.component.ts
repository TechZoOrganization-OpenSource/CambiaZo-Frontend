import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-contact-ong',
  standalone: true,
    imports: [
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatIcon,
        NgForOf
    ],
  templateUrl: './contact-ong.component.html',
  styleUrl: './contact-ong.component.css'
})
export class ContactOngComponent {
  @Input() ong: any;
  constructor(){}

}
