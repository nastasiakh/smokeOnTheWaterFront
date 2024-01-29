import { Component } from '@angular/core';
import { ProductModel } from '../../../../models/ProductModel';
import {select, Store} from "@ngrx/store";
import {selectProducts} from "../../../../store/selectors/selectors";
import {loadProductsActions} from "../../../../store/actions/product.action";
import {EntitiesListComponent} from "../../../../components/shared/entities-list/entities-list.component";
import {ButtonComponent} from "../../../../components/shared/button/button.component";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [
    EntitiesListComponent,
    ButtonComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  displayedColumns: string[] = ['id', 'title', 'sku', 'quantity', 'price'];
  productData: ProductModel[] = [];
  dataSource: any[] = [];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.loadProductData();

  }

  loadProductData(): void {
    this.store.dispatch(loadProductsActions.loadProducts());
    this.store.pipe(select(selectProducts)).subscribe(products => {
      if (products) {
        this.productData = products;
        this.dataSource = this.productData.map(product => {
          return {
            id: product.id,
            title: product.title,
            sku: product.sku,
            quantity: product.quantity,
            price: product.price,
          }
        })
      }
    })
  }
}
