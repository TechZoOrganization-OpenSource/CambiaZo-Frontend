import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule} from "@angular/material/icon";
import {UsersService} from "../../service/users/users.service";
import {PostsService} from "../../service/posts/posts.service";
import {NgForOf, NgIf} from "@angular/common";
import {Products} from "../../model/products/products.model";

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class MyPostsComponent implements OnInit{
  user : any = {};
  items: any = [];
  constructor(private userService:UsersService, private postService:PostsService) {}
  ngOnInit() {
    this.getUser();
    this.getAllProducts()
  }
  getUser(){
    this.userService.getUserById(Number(localStorage.getItem('id'))).subscribe((data)=>{
      this.user = data;
    })
  };
  getAllProducts() {
    this.postService.getProducs().subscribe((res:any)=>{
      res.forEach((product: any) => {
        this.items.push(new Products(
          product.id,
          product.user_id,
          product.category_id,
          product.product_name,
          product.description,
          product.change_for,
          product.price,
          product.images,
          product.boost,
          product.location)
        )

      })

      this.postService.getCategoriesProducts().subscribe((categories:any)=>{
        this.items.map((item:Products)=>{
          item.setCategory = categories.find((category:any)=>category.id === item.category_id).name
        })
      })

    })
  }
}
