import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-dialog-delete-post',
  standalone: true,
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIcon
    ],
  templateUrl: './dialog-delete-post.component.html',
  styleUrl: './dialog-delete-post.component.css'
})
export class DialogDeletePostComponent {
  constructor(private dialogRef: DialogRef<DialogDeletePostComponent>) {}
  onDelete(){
    this.dialogRef.close();
  }
}
