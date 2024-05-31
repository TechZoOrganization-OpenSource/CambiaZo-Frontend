import {Component, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardAvatar,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgOptimizedImage, NgStyle} from "@angular/common";
import {OffersService} from "../../service/offers/offers.service";
import {PostsService} from "../../service/posts/posts.service";
import {UsersService} from "../../service/users/users.service";
import {Offers} from "../../model/offers/offers.model";
import {Products} from "../../model/products/products.model";
import {DialogDeniedOfferComponent} from "../../../public/components/dialog-denied-offer/dialog-denied-offer.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-get-offers',
  standalone: true,
  imports: [
    MatCard,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    NgForOf,
    NgStyle,
    MatCardFooter,
    NgOptimizedImage
  ],
  templateUrl: './user-get-offers.component.html',
  styleUrl: './user-get-offers.component.css'
})
export class UserGetOffersComponent implements OnInit {

  offers: Offers[] = [];

  constructor(
    private offersService: OffersService,
    private postsService: PostsService,
    private usersService: UsersService,
    private dialog:  MatDialog
  ) { }

  ngOnInit() {
    this.getAllOffers();
  }

  getAllOffers() {
    this.offersService.getOffers().subscribe((data: any) => {
      data.forEach((offer: any) => {
        if (offer.id_user_get === localStorage.getItem('id') && offer.status === "Pendiente") {
          this.offers.push(new Offers(
            offer.id,
            offer.id_user_offers,
            offer.id_product_offers,
            offer.id_user_get,
            offer.id_product_get,
            offer.status
          ));
        }
      });
      this.offers.forEach((offer: Offers) => {
        this.postsService.getProductById(offer.id_product_get).subscribe((data: any) => {
          offer.setProductGet = data;
        });
        this.postsService.getProductById(offer.id_product_offers).subscribe((data: any) => {
          offer.setProductOffers = data;
        });
        this.usersService.getUserById(Number(offer.id_user_offers)).subscribe((data: any) => {
          offer.setUserOffers = data;
        });
      });
    });
  }


  setStatusAccepted(offerId: string) {
    this.offersService.updateOfferStatus(offerId, 'Aceptado').subscribe(() => {
      this.offers = this.offers.filter((offer:Offers)=>offer.id !== offerId)
    });
  }

  setStatusDenied(offerId: string) {
    const dialogRef = this.dialog.open(DialogDeniedOfferComponent,{disableClose: true });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.offersService.updateOfferStatus(offerId, 'Denegado').subscribe(() => {
          this.offers = this.offers.filter((offer:Offers)=>offer.id !== offerId)
        });
      }
    });
  }


  protected readonly Offers = Offers;
}



