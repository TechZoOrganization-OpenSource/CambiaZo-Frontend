import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {SearchProductsComponent} from "../../components/search-products/search-products.component";
import {ProductsFoundComponent} from "../../components/products-found/products-found.component";
import {JsonPipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-filter-products',
  standalone: true,
  imports: [
    SearchProductsComponent,
    ProductsFoundComponent,
    JsonPipe
  ],
  templateUrl: './filter-products.component.html',
  styleUrl: './filter-products.component.css'
})
export class FilterProductsComponent implements OnInit{
  @ViewChild(ProductsFoundComponent) productsFoundComponent!: ProductsFoundComponent;

  categorId:string = '';

  constructor(private router:ActivatedRoute){
  }
  ngOnInit() {
      this.getProductCategory()
  }

  getProductCategory(){
    this.router.paramMap.subscribe(params=>{
      const urlProductCategory = params.get('products')/*ong have this value: mathias&Id=1*/
      this.categorId = urlProductCategory ? urlProductCategory.split('&Id=')[1] : ''
    })
    }
  handleFilterProduct(form:any){
    this.productsFoundComponent.filterProducts(form)
  }

  handleCategoryProduct(categoryId:string){
    this.productsFoundComponent.filterProductsByCategory(categoryId)
  }
}
