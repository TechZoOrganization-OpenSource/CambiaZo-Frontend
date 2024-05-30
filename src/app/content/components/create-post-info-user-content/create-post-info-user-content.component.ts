import {Component, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatCheckbox} from "@angular/material/checkbox";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {CountriesService} from "../../service/countries/countries.service";
import {FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsersService} from "../../service/users/users.service";
import {Products} from "../../model/products/products.model";
import {Users} from "../../model/users/users.model";
import {validateForm} from "@emailjs/browser/es/utils/validateForm/validateForm";

@Component({
  selector: 'app-create-post-info-user-content',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    MatLabel,
    MatOption,
    MatSelect,
    MatIcon,
    MatSlideToggle,
    MatCheckbox,
    NgForOf,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    JsonPipe,
  ],
  templateUrl: './create-post-info-user-content.component.html',
  styleUrl: './create-post-info-user-content.component.css'
})
export class CreatePostInfoUserContentComponent implements OnInit{

  countries: any[]= []
  departments: any[]=[]
  cities: string[]=[]
  user: any;


  formProduct = new FormGroup({
     'user_id': new FormControl(localStorage.getItem('id'),Validators.required),
      'country': new FormControl(null,Validators.required),
      'departament': new FormControl(null,Validators.required),
      'district': new FormControl(null,Validators.required),
      'boost': new FormControl(false)
  });
  acceptPolicy = new FormControl(false, Validators.requiredTrue);


  constructor(private countriesService: CountriesService,private usersService: UsersService) {}

  ngOnInit() {
    this.getUser()
    this.getAllCountries()
  }
  onSubmit() {
    this.formProduct.markAllAsTouched();
    this.acceptPolicy.markAsTouched();

    if (this.formProduct.valid && this.acceptPolicy.valid) {
      return this.formProduct.value
    }else return null
  }
  getAllCountries(){
    this.countriesService.getCountries().subscribe((res:any)=>{
      this.countries = res
    })

  }

  getUser(){
    this.usersService.getUserById(Number(localStorage.getItem('id'))).subscribe((data)=>{
      this.user = new Users(
        data.id,
        data.name,
        data.email,
        data.phone,
        data.password,
        data.membership,
        data.img,
        []
      );
      console.log(this.user.name)
    })
  }

  onCountrySelectionChange(){
    this.departments = []
    this.cities = []
    this.formProduct.get('departament')?.reset()
    this.formProduct.get('district')?.reset()
    if(this.formProduct.value.country) {
      const selectedCountryObj = this.countries.find(c => c.country === this.formProduct.value.country);
      this.departments = selectedCountryObj.departments;
    }

  }
  onCitiesSelectionChange(){
    this.cities = []
    this.formProduct.get('district')?.reset()
    if(this.formProduct.value.departament) {
      const selectedDepartmentObj = this.departments.find(c => c.name === this.formProduct.value.departament);
      this.cities = selectedDepartmentObj.cities;
    }
  }


}
