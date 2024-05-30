import {Component, OnInit} from '@angular/core';
import { OffersService } from '../../service/offers/offers.service';
import { PostsService} from "../../service/posts/posts.service";
import { UsersService } from '../../service/users/users.service';
import {Offers} from "../../model/offers/offers.model";
import {MatCard, MatCardAvatar, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-user-sent-offers',
  standalone: true,
  imports: [
    MatCard,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    NgForOf
  ],
  templateUrl: './user-sent-offers.component.html',
  styleUrl: './user-sent-offers.component.css'
})
export class UserSentOffersComponent implements OnInit{
  offers: any[] = [];


  constructor(private offersService: OffersService, private postsService: PostsService, private usersService: UsersService) { }

  ngOnInit() {
    this.getAllOffers();
  }
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
          this.postsService.getProductById(offer.id_product_get).subscribe((data: any) => {
            offer.setProductGet = data;
          })
      });
      this.offers.map((offer: any) => {
        this.usersService.getUserById(offer.id_user_get).subscribe((data: any) => {
          offer.setUserGet = data;
        })
      });
      console.log(this.offers);
  })
}

  protected readonly Offers = Offers;
}
