import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {PostsService} from "../../service/posts/posts.service";
import {CategoriesObjects} from "../../model/categories-objects/categories-objects.model";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
@Component({
  selector: 'app-create-info-post-content',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelect,
    MatOption,
    MatSlideToggle,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
  ],
  templateUrl: './create-info-post-content.component.html',
  styleUrl: './create-info-post-content.component.css'
})
export class CreateInfoPostContentComponent implements OnInit{

  categories: CategoriesObjects[]=[]

  formProduct = new FormGroup({
    'category_id': new FormControl(null, Validators.required),
    'product_name': new FormControl(null, Validators.required),
    'description': new FormControl(null, Validators.required),
    'change_for': new FormControl(null, Validators.required),
    'price': new FormControl(null, Validators.required),
    }
  )
  constructor(private postService:PostsService) {
  }

  ngOnInit() {
    this.getCategoriesPostOptions()
    this.formProduct.get('product_name')?.valueChanges.subscribe(value => {
      if (value === '') {
        this.formProduct.get('product_name')?.setValue(null, { emitEvent: false });
      }
    });

    this.formProduct.get('description')?.valueChanges.subscribe(value => {
      if (value === '') {
        this.formProduct.get('description')?.setValue(null, { emitEvent: false });
      }
    });

    this.formProduct.get('change_for')?.valueChanges.subscribe(value => {
      if (value === '') {
        this.formProduct.get('change_for')?.setValue(null, { emitEvent: false });
      }
    });

  }


  onSubmit() {
    this.formProduct.markAllAsTouched();
    if (this.formProduct.valid) {
      return this.formProduct.value;
    }else return null
  }
  getCategoriesPostOptions(){
    this.postService.getCategoriesProducts().subscribe((res:any)=> {
        this.categories = res
      },error => console.log(error)
    )};

   imagesUrls: any[]= [];
  maxFiles: number = 8;
  onFilesSelected(event: any) {

    const files: FileList = event.target.files;
    if (files.length > this.maxFiles) {
      alert(`Solo puedes seleccionar hasta ${this.maxFiles} archivos.`);
      this.imagesUrls = [];
      event.target.value = "";
      return
    }
    if (files && files.length > 0) {
      this.imagesUrls = []; // Reseteamos el array de URLs
      const totalFiles = Math.min(files.length, this.maxFiles);
      for (let i = 0; i < totalFiles; i++) {
        const file: File = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.imagesUrls.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }

    }
  }
}
