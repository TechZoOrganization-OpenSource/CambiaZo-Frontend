import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {Products} from "../../model/products/products.model";
import {Users} from "../../model/users/users.model";
import {UsersService} from "../../service/users/users.service";
import {PostsService} from "../../service/posts/posts.service";
import {FormEditPostComponent} from "../../components/form-edit-post/form-edit-post.component";
import {MatIcon} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {OngsService} from "../../service/ongs/ongs.service";
import {Ongs} from "../../model/ongs/ongs.model";
import {
  CreatePostInfoUserContentComponent
} from "../../components/create-post-info-user-content/create-post-info-user-content.component";
import {
  CreateInfoPostContentComponent
} from "../../components/create-info-post-content/create-info-post-content.component";

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    MatIcon,
    MatCardModule,
    MatButton,
    MatIcon,
    FormEditPostComponent,
    CreatePostInfoUserContentComponent,
    CreateInfoPostContentComponent,
    NgIf
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit{

  @ViewChild(CreatePostInfoUserContentComponent) createPostInfoUserContentComponent!: CreatePostInfoUserContentComponent;
  @ViewChild(CreateInfoPostContentComponent) createInfoPostContentComponent!: CreateInfoPostContentComponent;
  post:any
  constructor(private productsService:PostsService,private route: ActivatedRoute){
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const products = params.get('postId')/*ong have this value: mathias&Id=1*/
      const id = products ? products.split('&Id=')[1] : ''/*id have this value: 1*/
      this.getPost(id);
    });
  }
  getPost(id:string) {
    this.productsService.getProductById(id).subscribe((res:any)=>{
      this.post = new Products(
        res.id,
        res.user_id,
        res.category_id,
        res.product_name,
        res.description,
        res.change_for,
        res.price,
        res.images,
        res.boost,
        res.location
      )
    })
  }


  onPost(){
    const infoProduct = this.createInfoPostContentComponent.onSubmit()
    const contactProduct = this.createPostInfoUserContentComponent.onSubmit()

    if(infoProduct && contactProduct){
      this.createInfoPostContentComponent.uploadImage().then((images:string[]) => {
        const newProduct =
          {
            user_id: localStorage.getItem('id'),
            ...infoProduct,
            'images':images,
            'boost': contactProduct.boost,
            'location':{
              'country': contactProduct.country,
              'departament':contactProduct.departament,
              'district': contactProduct.district
            }
          }
        this.productsService.putProduct(this.post.id,newProduct).subscribe()
      })

    }

  }

}
