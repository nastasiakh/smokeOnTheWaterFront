import {Component} from '@angular/core';
import {map, Observable, of, switchMap, take} from "rxjs";
import {OrderProductModel} from "../../../../../models/OrderProductModel";
import {ProductModel} from "../../../../../models/ProductModel";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {InputComponent} from "../../../../../components/shared/input/input.component";
import {OrderModel} from "../../../../../models/OrderModel";
import {select, Store} from "@ngrx/store";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {loadProductsActions} from "../../../../../store/actions/product.action";
import {
  selectOrder,
  selectOrderState,
  selectProducts,
} from "../../../../../store/selectors/selectors";
import {deleteOrderActions, loadOrderByIdActions} from "../../../../../store/actions/order.action";
import {OrderWithProductsModel} from "../../../../../models/OrderWithProductsModel";
import {ButtonComponent} from "../../../../../components/shared/button/button.component";
import {AddressModel} from "../../../../../models/AddressModel";
import {EntitiesListComponent} from "../../../../../components/shared/entities-list/entities-list.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    AsyncPipe,
    InputComponent,
    NgIf,
    ButtonComponent,
    EntitiesListComponent,
    RouterLink,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    FormsModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  orderId: number = 0;
  values: { [key: string]: string } = {};

  order$: Observable<OrderModel | null> = of({} as OrderModel);
  address: AddressModel = {} as AddressModel;
  orderProducts$: Observable<OrderProductModel[] | []> = of([] as OrderProductModel[]);
  products$: Observable<ProductModel[] | undefined> = of([] as ProductModel[]);

  selectedProductIds: number[] | undefined;
  selectedProducts: OrderProductModel[] = [];
  selectedProduct: ProductModel = {} as ProductModel;

  isCreatingOrder = true;

  constructor(private store: Store, private route: ActivatedRoute, private router: Router,
              private snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.products$ = this.loadProducts();
    this.route.paramMap.pipe(
      switchMap(async (params) => {
        this.orderId = Number(params.get("orderId"));
        if (this.orderId) {
          this.isCreatingOrder = false;
          this.store.dispatch(loadOrderByIdActions.loadOrderById({orderId: this.orderId}));
          return this.store.pipe(select(selectOrder))
        }
        return of({order: {} as OrderModel, orderProducts: [] as OrderProductModel[]} as OrderWithProductsModel);
      }),
      take(1)
    ).subscribe((orderWithProds) => {
      orderWithProds.subscribe((data: OrderWithProductsModel | null) => {
        if (data !== null) {
          this.order$ = of(data.order);
          this.order$.pipe(map(order => order)).subscribe(order => {
            this.address = order?.address ?? {} as AddressModel;
          });
          this.orderProducts$ = of(data.orderProducts);
          this.orderProducts$.pipe(
            map(products => products.map(product => product
            ))
          ).subscribe(products => {
            this.selectedProductIds = products.map(p => p.productId);
            this.selectedProducts = products;
          });
        }
      });
    })
  }

  onInputChange(inputType: string, value: string): void {
    this.values[inputType] = value;
  }

  loadProducts(): Observable<ProductModel[] | undefined> {
    this.store.dispatch(loadProductsActions.loadProducts())
    return this.store.pipe(select(selectProducts))
  }


  saveOrder() {
    console.log(this.values)
  }

  updateQuantity(productInCart: OrderProductModel): void {
    let productIndex = this.selectedProducts.findIndex(p => p.productId === productInCart.productId);
    if (productIndex != -1) {
      this.products$.pipe(take(1)).subscribe(products => {
        const foundProduct = products?.find(p => p.id === productInCart.productId);
        const availableQuantity = foundProduct?.quantity;

        if (availableQuantity != undefined) {
          this.selectedProducts[productIndex] = {
            ...productInCart,
            quantity: (productInCart.quantity > availableQuantity) ? availableQuantity : productInCart.quantity
          };
        }
      });
    }
  }

  onProductSelection(product: ProductModel): void {
    const existingProductIndex = this.selectedProducts.findIndex(p => p.productId === product.id);
    if (existingProductIndex === -1 && product.id) {
      this.selectedProducts.push({
        productId: product.id,
        title: product.title,
        sku: product.sku,
        quantity: 1,
        price: product.price
      });
      this.selectedProduct = {} as ProductModel;
    }
  }

  removeProductFromCart(product: OrderProductModel): void {
    if (product) {
      this.selectedProducts = this.selectedProducts.filter(p => p.productId !== product.productId);
    }
  }

  isProductDisabled(productId: number | undefined): boolean {
    return this.selectedProducts.some(p => p.productId === productId);
  }

  removeOrder(orderId: number) {
    this.store.dispatch(deleteOrderActions.deleteOrder({orderId}));
    this.store.pipe(select(selectOrderState)).subscribe(orderState => {
      if (orderState.orderRemoved) {
        this.navigateToOrderList();
        this.showSuccessSnackBar('Order successfully deleted');
      } else {
        this.showSuccessSnackBar('Order deleting failed');
      }
    })
  }

  private navigateToOrderList(): void {
    this.router.navigate(['/admin/orders']);
  }

  private showSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {duration: 3000, panelClass: 'success-snackbar'});
  }

  private showErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {duration: 3000, panelClass: 'error-snackbar'});
  }
}
