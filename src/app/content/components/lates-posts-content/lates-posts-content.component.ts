import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import { CommonModule } from '@angular/common';
import {FeaturePostsContentComponent} from "../feature-posts-content/feature-posts-content.component";
import {PostsService} from "../../service/posts/posts.service";
import {MatIcon} from "@angular/material/icon";
import {Products} from "../../model/products/products.model";
@Component({
  selector: 'app-lates-posts-content',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    FeaturePostsContentComponent,
    MatIcon
  ],
  templateUrl: './lates-posts-content.component.html',
  styleUrl: './lates-posts-content.component.css'
})
export class LatesPostsContentComponent implements OnInit{
  items:Products[]=[]

  constructor(private postService:PostsService) {
  }
  ngOnInit() {
    this.getAllProducts()
  }

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
