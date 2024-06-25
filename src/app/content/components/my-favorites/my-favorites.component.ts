import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule} from "@angular/material/icon";
import {UsersService} from "../../service/users/users.service";
import {NgForOf, NgIf} from "@angular/common";
import {Products} from "../../model/products/products.model";
import {PostsService} from "../../service/posts/posts.service";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogDeletePostFavoritesComponent} from "../../../public/components/dialog-delete-post-favorites/dialog-delete-post-favorites.component";
import {DialogRef} from "@angular/cdk/dialog";


@Component({
  selector: 'app-my-favorites',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    NgForOf,
    NgIf,
    MatMenuModule,
    MatIconModule,
    MatIconButton,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './my-favorites.component.html',
  styleUrl: './my-favorites.component.css'
})
export class MyFavoritesComponent implements OnInit{
  user : any = {};
  id_favorites: any = [];
  favorites: Products[] = [];

  constructor(private userService:UsersService,private dialogDeletePostFavorites: MatDialog, private postService:PostsService) {}

  ngOnInit() {
    this.getUser();
  }

  getProductById(pid: string) {
    return this.postService.getProductById(pid);
  }

  getUser() {
    this.userService.getUserById(Number(localStorage.getItem('id'))).subscribe((data) => {
      this.user = data;
      this.id_favorites = this.user.favorites;
      for(let i=0; i<this.id_favorites.length; i++) {
        this.getProductById(this.id_favorites[i].product_id).subscribe((product) => {
          this.favorites.push(product);
        });
      }
    });
  }

  openConfirm(id: string) {
    const dialogRef = this.dialogDeletePostFavorites.open(DialogDeletePostFavoritesComponent,{disableClose: true, data:id});
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        for(let i=0;i<this.id_favorites.length;i++){
          if(this.id_favorites[i].product_id === id){
            this.id_favorites.splice(i,1);
            break;
          }
        }
        for(let i=0;i<this.favorites.length;i++){
          if(this.favorites[i].id === id){
            this.favorites.splice(i,1);
            break;
          }
        }
        this.user.favorites= this.id_favorites;
        this.userService.putUser(this.user.id,this.user).subscribe((res)=>{
          console.log(res)
        })
      }
    });
  }



}
