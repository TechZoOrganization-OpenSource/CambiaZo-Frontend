import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Products } from "../../../content/model/products/products.model";
import { UsersService } from "../../../content/service/users/users.service";
import { PostsService } from "../../../content/service/posts/posts.service";
import { OffersService } from "../../../content/service/offers/offers.service";
import { MatCardModule } from '@angular/material/card';
import { NgForOf, NgIf } from '@angular/common';
import { Offers } from '../../../content/model/offers/offers.model';
import { DialogOfferSuccessfulComponent} from "../dialog-offer-successful/dialog-offer-successful.component";

@Component({
  selector: 'app-dialog-select-product',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    MatIconModule,
    CommonModule,
    MatCardModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './dialog-select-product.component.html',
  styleUrls: ['./dialog-select-product.component.css']
})
export class DialogSelectProductComponent implements OnInit {
  user: any = {};
  items: Products[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogSelectProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService,
    private postService: PostsService,
    private offersService: OffersService,
    private dialogSuccess: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getUserProducts();
  }

  getUser(): void {
    this.userService.getUserById(Number(localStorage.getItem('id'))).subscribe(data => {
      this.user = data;
    });
  }

  getUserProducts(): void {
    this.postService.getProducs().subscribe((res: any) => {
      res.forEach((product: any) => {
        if (product.user_id === this.user.id) {
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
            product.location
          ));
        }
      });
      this.postService.getCategoriesProducts().subscribe((categories: any) => {
        this.items.map((item: Products) => {
          item.setCategory = categories.find((category: any) => category.id === item.category_id).name;
        });
      });
    });
  }

  closeDialog(): void {
    this.dialogRef.close()
    this.dialogRef.afterClosed().subscribe(() => {
      this.dialogSuccess.open(DialogOfferSuccessfulComponent,{data: {
          product_name: this.data.product_name,
          user_name: this.data.user_name
        }})
    })
  }

  offer(product: Products): void {

    const newOffer = new Offers(
      String(localStorage.getItem('id')), // ID del usuario que hace la oferta
      String(product.id), // ID del producto que ofrece
      this.data.user_id, // ID del usuario que recibe la oferta
      this.data.product_id, // ID del producto que recibe la oferta
      'Pendiente', // Estado de la oferta
      '' // ID de la oferta, lo puede generar el backend
    )

    this.offersService.postOffer(newOffer).subscribe((data: Offers) => {
    }, error => {
      console.error('Error creating offer:', error);
    });

    this.closeDialog();

  }
}
