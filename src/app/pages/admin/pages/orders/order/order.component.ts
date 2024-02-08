import {Component} from '@angular/core';
import {catchError, map, Observable, of, switchMap, take} from "rxjs";
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
import {
  createOrderActions,
  deleteOrderActions,
  loadOrderByIdActions,
  updateOrderActions
} from "../../../../../store/actions/order.action";
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
  total: number = 0;

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
    this.calculateTotal();
  }

  onProductSelection(product: ProductModel): void {
    if (product.id) {
      const existingProductIndex = this.selectedProducts.findIndex(p => p.productId === product.id);
      if (existingProductIndex === -1) {
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
    this.calculateTotal();
  }

  removeProductFromCart(product: OrderProductModel): void {
    if (product) {
      this.selectedProducts = this.selectedProducts.filter(p => p.productId !== product.productId);
    }
    this.calculateTotal();

  }

  calculateTotal(): void {
    this.total = this.selectedProducts.reduce((acc, curr) => {
      return acc + (curr.price * curr.quantity);
    }, 0);
  }


  isProductDisabled(productId: number | undefined): boolean {
    return this.selectedProducts.some(p => p.productId === productId);
  }

  filterAddressFields(): AddressModel {
    const newAddress = {
      country: this.values['address.country'],
      region: this.values['address.region'],
      location: this.values['address.location'],
      street: this.values['address.street'],
      houseNum: this.values['address.houseNum'],
      zipcode: this.values['address.zipcode'],
      apartment: parseInt(this.values['address.apartment'])
    }
    Object.keys(this.values).forEach((key) => {
      if (key.startsWith('address.')) {
        delete this.values[key];
      }
    });
    return newAddress;
  }

  saveOrder(order: OrderModel) {
    let updatedProducts = this.selectedProducts;
    let updatedOrderValues: OrderModel = {
      ...order, address: {...this.address, ...this.filterAddressFields()},
      ...this.values,
      totalAmount: this.total,
      customerId: undefined,
      status: this.isCreatingOrder ? 'created' : 'changed'
    };

    if (!this.isCreatingOrder && order.id) {
      updatedProducts.forEach(prod => {
        if (!prod.orderId) {
          prod.orderId = this.orderId
        }
      });
      this.store.dispatch(updateOrderActions.updateOrder({
        orderId: order.id,
        updatedOrder: {
          order: updatedOrderValues,
          orderProducts: updatedProducts
        }
      }))
    } else {
      this.store.dispatch(createOrderActions.createOrder({
        order: {
          order: updatedOrderValues,
          orderProducts: updatedProducts
        }
      }))
    }

    this.store.pipe(select(selectOrderState), catchError(error => {
      return of(error)
    })).subscribe(orderState => {
      if (orderState?.orderModified) {
        this.showSuccessSnackBar("Changes saved")
        setTimeout(() => this.navigateToOrderList(), 2000);
      } else if (orderState?.error) {
        this.showErrorSnackBar("Changes weren't saved")
        console.error("Order not modified: ", orderState?.error)
      }
    })
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
