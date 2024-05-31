import {Component, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
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
      FormEditPostComponent
    ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit{
  @Output() post_obj: any;
  post:any;
  id:any;
  constructor(private postService:PostsService,private route: ActivatedRoute){
    this.route.params.subscribe(params => this.post=(params));
    this.post= this.post.postId;
    const idStartIndex = this.post.indexOf('=');
    this.id = this.post.slice(idStartIndex + 1);
  }

  ngOnInit() {
    this.getPost(this.id)
  }



  getPost(id: string){
    this.postService.getProductById(id).subscribe((res:any)=>{
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
      this.post_obj = this.post;
      console.log("THIS IS POST_OBJ ",this.post_obj)
    })
  }

}
