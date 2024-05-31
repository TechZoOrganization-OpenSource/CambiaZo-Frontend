import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { PostsService } from '../../service/posts/posts.service';
import { UsersService } from '../../service/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogFavoritesComponent } from '../../../public/components/dialog-favorites/dialog-favorites.component';
import { DialogSelectProductComponent } from '../../../public/components/dialog-select-product/dialog-select-product.component';
import { MatCardModule, MatCardContent, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-product-information',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardContent,
    MatCardTitle,
    CommonModule,
    MatButton,
    RouterLink
  ],
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit {
  product: any;
  categories: any[] = [];
  user: any;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private usersService: UsersService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.postsService.getProductById(productId).subscribe((data) => {
        this.product = data;
        this.loadCategories();
        this.loadUser(data.user_id);
      });
    }
  }

  loadCategories(): void {
    this.postsService.getCategoryProductById(this.product.category_id).subscribe((category: any) => {
      this.product.categoryName = category.name;
    })
  }

  loadUser(userId: number): void {
    this.usersService.getUserById(userId).subscribe((user) => {
      this.user = user;
    });
  }

  getLoggedInUserId(): number | null {
    const userId = localStorage.getItem('id');
    return userId ? Number(userId) : null;
  }

  addToFavorites(): void {
    const loggedInUserId = this.getLoggedInUserId();
    if (loggedInUserId) {
      this.usersService.getUserById(loggedInUserId).subscribe((loggedInUser) => {
        if (!loggedInUser.favorites.some((f: any) => f.product_id === this.product.id)) {
          loggedInUser.favorites.push({ product_id: this.product.id });
          this.usersService.putUser(loggedInUser.id, loggedInUser).subscribe((res) => {
            console.log('Added to favorites:', res);
            this.dialog.open(DialogFavoritesComponent);
          });
        } else {
          console.log('Product is already in favorites');
        }
      });
    } else {
      console.log('User is not logged in');
    }
  }

  offer(): void {
    this.dialog.open(DialogSelectProductComponent,{data:{
      product_id: this.product.id,
        user_id: this.user.id
      }});
  }

  protected readonly localStorage = localStorage;
}
