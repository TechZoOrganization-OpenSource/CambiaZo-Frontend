import { Component } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {DialogRef} from "@angular/cdk/dialog";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-dialog-delete-post',
  standalone: true,
    imports: [
      MatDialogModule, MatButtonModule, RouterLink, MatIcon
    ],
  templateUrl: './dialog-delete-post.component.html',
  styleUrl: './dialog-delete-post.component.css'
})
export class DialogDeletePostComponent {
  constructor(private dialogRef: DialogRef<DialogDeletePostComponent>,private router: Router) {}

  confirmDelete(){
    this.router.navigateByUrl('/home')
    this.dialogRef.close();
  }

}
