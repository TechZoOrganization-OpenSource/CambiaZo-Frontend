import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {Router, RouterLink} from "@angular/router";
import {UsersService} from "../../service/users/users.service";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomValidators} from "../../service/validators/validators.service";
import {NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {DialogDeleteAccountComponent} from "../../components/dialog-delete-account/dialog-delete-account.component";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogSuccessfullyChangeComponent
} from "../../components/dialog-successfully-change/dialog-successfully-change.component";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    RouterLink,
    MatIcon,
    MatIconButton,
    MatFormField,
    ReactiveFormsModule,
    NgIf,
    MatInput,
    MatLabel
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  user: any = {};
  editProfileForm: FormGroup;
  changePasswordForm: FormGroup;
  changePassword=false;
  submitted = false;
  currentPasswordInvalid = false;
  changePasswordError: string | null = null;
  changePasswordSuccess: string | null = null;

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router, private dialog: MatDialog) {
    this.editProfileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.validEmail]],
      phone: ['', [Validators.required, CustomValidators.onlyNumbers, Validators.minLength(9), Validators.maxLength(9)]]
    });

    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userId = Number(localStorage.getItem('id'));
    this.userService.getUserById(userId).subscribe((data) => {
      this.user = data;
      this.editProfileForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        password: this.user.password
      });
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editProfileForm.valid) {
      const userId = String(localStorage.getItem('id'));
      this.userService.putUser(userId, this.editProfileForm.value).subscribe(() => {
        const dialogRef = this.dialog.open(DialogSuccessfullyChangeComponent);
        dialogRef.afterClosed().subscribe(() => {
          window.location.reload();
        });
      });
    }
  }

  changePasswordButton(){
    this.changePassword=true;
  }

  validateCurrentPassword() {
    const currentPassword = this.changePasswordForm.get('currentPassword')?.value;
    if (currentPassword !== this.user.password) {
      this.currentPasswordInvalid = true;
      this.changePasswordForm.get('currentPassword')?.setErrors({ incorrect: true });
    } else {
      this.currentPasswordInvalid = false;
      this.changePasswordForm.get('currentPassword')?.setErrors(null);
    }
  }

  onChangePassword() {
    this.submitted = true;
    this.changePasswordError = null;
    this.changePasswordSuccess = null;

    if (this.changePasswordForm.valid) {
      const userId = String(localStorage.getItem('id'));
      const newPassword = this.changePasswordForm.value.newPassword;

      this.userService.changePassword(userId, newPassword).subscribe(() => {
        const dialogRef = this.dialog.open(DialogSuccessfullyChangeComponent);
        dialogRef.afterClosed().subscribe(() => {
          window.location.reload();
        });
      });
    } else {
      if (this.changePasswordForm.controls['currentPassword'].invalid) {this.changePasswordForm.controls['currentPassword'].markAsTouched();}
      if (this.changePasswordForm.controls['newPassword'].invalid) {this.changePasswordForm.controls['newPassword'].markAsTouched();}
    }
  }

  closeSession() {
    localStorage.removeItem('id');
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
  }
  forgotPassword() {
    localStorage.removeItem('id');
    this.router.navigateByUrl('/verify-email').then(() => {
      window.location.reload();
    });
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(DialogDeleteAccountComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        const userId = String(localStorage.getItem('id'));
        this.userService.deleteUser(userId).subscribe(() => {
          localStorage.removeItem('id');
          this.router.navigateByUrl('/login').then(() => {
            window.location.reload();
          });
        });
      }
    });
  }
}
