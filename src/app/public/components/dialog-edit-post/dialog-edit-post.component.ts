import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-dialog-edit-post',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIcon
  ],
  templateUrl: './dialog-edit-post.component.html',
  styleUrl: './dialog-edit-post.component.css'
})
export class DialogEditPostComponent {
  constructor(private dialogRef: DialogRef<DialogEditPostComponent>) {}
  onEdit(){
    this.dialogRef.close();
  }
}
