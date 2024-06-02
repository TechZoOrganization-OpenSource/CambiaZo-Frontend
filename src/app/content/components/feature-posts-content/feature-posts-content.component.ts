import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {PostsService} from "../../service/posts/posts.service";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Products} from "../../model/products/products.model";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-feature-posts-content',
  standalone: true,
  imports: [MatCardModule, NgForOf, NgIf, MatButton, MatIcon, RouterLink],
  templateUrl: './feature-posts-content.component.html',
  styleUrl: './feature-posts-content.component.css'
})
export class FeaturePostsContentComponent implements OnInit{
  items:Products[]=[]

  constructor(private postsService:PostsService) {
  }
  ngOnInit() {
    this.getAllFeaturePosts()
  }

  getAllFeaturePosts(){
    this.postsService.getProducs().subscribe((res:any)=>{
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

        this.postsService.getCategoriesProducts().subscribe((categories:any)=>{
          this.items.map((item:Products)=>{
            item.setCategory = categories.find((category:any)=>category.id === item.category_id).name
          })
        })

  })
  }

}
