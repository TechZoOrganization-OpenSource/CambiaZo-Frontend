import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../service/users/users.service";
import {MatTabsModule} from '@angular/material/tabs';
import {HeaderProfileComponent} from "../../components/header-profile/header-profile.component";
import {MyPostsComponent} from "../../components/my-posts/my-posts.component";
import {MyReviewsComponent} from "../../components/my-reviews/my-reviews.component";
import {MyFavoritesComponent} from "../../components/my-favorites/my-favorites.component";
import {UserOffersComponent} from "../../components/user-offers/user-offers.component";

@Component({
  selector: 'app-own-profile',
  standalone: true,
  imports: [
    HeaderProfileComponent,
    MatTabsModule,
    MyPostsComponent,
    MyReviewsComponent,
    MyFavoritesComponent,
    UserOffersComponent
  ],
  templateUrl: './own-profile.component.html',
  styleUrl: './own-profile.component.css'
})
export class OwnProfileComponent implements OnInit{
  user : any = {};
  constructor(private userService:UsersService) {}
  ngOnInit(){
    this.getUser();
  }
  getUser(){
    this.userService.getUserById(Number(localStorage.getItem('id'))).subscribe((data)=>{
      this.user = data;
      console.log(this.user)
    });
  }
}
