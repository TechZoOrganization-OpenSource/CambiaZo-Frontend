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
  submitted = false;

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) {
    this.editProfileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.validEmail]],
      phone: ['', [Validators.required, CustomValidators.onlyNumbers, Validators.minLength(9), Validators.maxLength(9)]]
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
        phone: this.user.phone
      });
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editProfileForm.valid) {
      const userId = String(localStorage.getItem('id'));
      this.userService.putUser(userId, this.editProfileForm.value).subscribe(() => {
          window.location.reload();
      });
    }
  }
}
