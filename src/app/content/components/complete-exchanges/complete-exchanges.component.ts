import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule} from "@angular/material/icon";
import {UsersService} from "../../service/users/users.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Products} from "../../model/products/products.model";
import {PostsService} from "../../service/posts/posts.service";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Offers} from "../../model/offers/offers.model";
import {OffersService} from "../../service/offers/offers.service";
import {Users} from "../../model/users/users.model";
import {Reviews} from "../../model/reviews/reviews.model";
import {ReviewsService} from "../../service/reviews/reviews.service";
import {FormArray, FormGroup, FormBuilder, FormControl, ReactiveFormsModule, Form} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import {DialogEditPostComponent} from "../../../public/components/dialog-edit-post/dialog-edit-post.component";

@Component({
  selector: 'app-complete-exchanges',
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
    RouterLink,
    NgClass,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './complete-exchanges.component.html',
  styleUrl: './complete-exchanges.component.css'
})
export class CompleteExchangesComponent implements OnInit{


  offers: any[] = [];
  userMe: any = {};
  maxRating: number = 5;
  selectedStar:number[]=[];
  maxRatingArr:any=[];
  previousSelection:number[]=[];
  inputs: any[] = [];

  offers2: any[] = [];
  constructor(private dialogReviewPost: MatDialog,private offersService:OffersService, private postService:PostsService, private userService:UsersService, private reviewService:ReviewsService) {}



  ngOnInit() {
    this.maxRatingArr=Array(this.maxRating).fill(0);
    this.getUser();
    this.getAllOffers();
    this.getAllOffers2();
  }

  getUser(){
    this.userService.getUserById(Number(localStorage.getItem('id'))).subscribe((data)=>{
      this.userMe = data;
    })
  };


  getAllOffers(){
    this.offersService.getOffers().subscribe((data: any) => {
      data.forEach((offer: any) => {
        if (offer.id_user_offers === localStorage.getItem('id')) {
          this.offers.push(new Offers(
              offer.id,
              offer.id_user_offers,
              offer.id_product_offers,
              offer.id_user_get,
              offer.id_product_get,
              offer.status
            )
          )
        }
      });
      this.offers.map((offer: any) => {
        this.postService.getProductById(offer.id_product_get).subscribe((data: any) => {
          offer.setProductGet = data;
        })
      });
      this.offers.map((offer: any) => {
        this.postService.getProductById(offer.id_product_offers).subscribe((data: any) => {
          offer.setProductOffers = data;
        })
      });
      this.offers.map((offer: any) => {
        this.userService.getUserById(offer.id_user_get).subscribe((data: any) => {
          offer.setUserGet = data;
        });
      });
    });
  }
  protected readonly Offers = Offers;


  getAllOffers2(){
    this.offersService.getOffers().subscribe((data: any) => {
      data.forEach((offer: any) => {
        if (offer.id_user_get === localStorage.getItem('id')) {
          this.offers2.push(new Offers(
              offer.id,
              offer.id_user_offers,
              offer.id_product_offers,
              offer.id_user_get,
              offer.id_product_get,
              offer.status
            )
          )
        }
      });
      this.offers2.map((offer: any) => {
        this.postService.getProductById(offer.id_product_offers).subscribe((data: any) => {
          offer.setProductGet = data;
        })
      });
      this.offers2.map((offer: any) => {
        this.postService.getProductById(offer.id_product_get).subscribe((data: any) => {
          offer.setProductOffers = data;
        })
      });
      this.offers2.map((offer: any) => {
        this.userService.getUserById(offer.id_user_offers).subscribe((data: any) => {
          offer.setUserGet = data;
        });
      });
    });
  }
  protected readonly Offers2 = Offers;


  HandleMouseEnter(indexRate:number,indexOffer:number){
    this.selectedStar[indexOffer]=indexRate+1;
  }

  HandleMouseLeave(indexOffer:number){
    if(this.previousSelection[indexOffer]!==0) {
      this.selectedStar[indexOffer] = this.previousSelection[indexOffer];
    }else {
      this.selectedStar[indexOffer]=0;
    }
  }

  Rating(indexRate:number,indexOffer:number){
    this.selectedStar[indexOffer]=indexRate+1;
    this.previousSelection[indexOffer]=this.selectedStar[indexOffer];
  }

  sendReview(indexOffer:any, otherId:any){
    if(this.selectedStar[indexOffer]==0){
      alert("Por favor seleccione una puntuación de estrellas");
    }
    if(this.selectedStar[indexOffer]!=0){
        const review = {
          content: this.inputs[indexOffer],
          score: this.selectedStar[indexOffer],
          get_user_id: otherId,
          give_user_id: this.userMe.id
        }
        console.log(review);
        this.reviewService.postReview(review).subscribe((data) => {
          this.dialogReviewPost.open(DialogEditPostComponent,{disableClose: true});
        });
    }
  }

}
