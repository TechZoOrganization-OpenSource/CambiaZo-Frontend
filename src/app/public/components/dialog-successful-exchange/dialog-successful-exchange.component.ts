import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {DialogRef} from "@angular/cdk/dialog";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-dialog-successful-exchange',
  standalone: true,
    imports: [
      MatDialogModule, MatButtonModule, RouterLink, MatIcon
    ],
  templateUrl: './dialog-successful-exchange.component.html',
  styleUrl: './dialog-successful-exchange.component.css'
})
export class DialogSuccessfulExchangeComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
