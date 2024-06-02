import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {NgxDropzoneModule} from "ngx-dropzone";

@Component({
  selector: 'app-dialog-change-profile',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatIcon,
    RouterLink,
    NgForOf,
    NgIf,
    NgxDropzoneModule
  ],
  templateUrl: './dialog-change-profile.component.html',
  styleUrl: './dialog-change-profile.component.css'
})
export class DialogChangeProfileComponent {

  files: File[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) {
  }
  changeImageProfile(){

  }

  onSelect(event:any) {
    if (this.files.length) this.files.splice(this.files.indexOf(event), 1);
    this.files.push(event.addedFiles[0]);
  }

  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
  }


}
