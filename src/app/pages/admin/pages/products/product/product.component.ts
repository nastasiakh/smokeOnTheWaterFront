import { Component } from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {ButtonComponent} from "../../../../../components/shared/button/button.component";
import {InputComponent} from "../../../../../components/shared/input/input.component";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {catchError, map, Observable, of, switchMap, take} from "rxjs";
import {ProductModel} from "../../../../../models/ProductModel";
import {select, Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoryModel} from "../../../../../models/CategoryModel";
import {FormsModule} from "@angular/forms";
import {
  createProductActions,
  deleteProductActions, loadProductByIdActions,
  updateProductActions
} from "../../../../../store/actions/product.action";
import {
  selectCategories,
  selectProduct,
  selectProductState,
} from "../../../../../store/selectors/selectors";

import {loadCategoriesActions} from "../../../../../store/actions/category.action";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonComponent,
    InputComponent,
    MatError,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    NgIf,
    FormsModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  values: { [key: string]: string } = {};
  product$: Observable<ProductModel | null> = of({} as ProductModel);
  chosenCategories: (number | undefined)[] | undefined = [];
  categories$: Observable<CategoryModel[] | undefined> = of([] as CategoryModel[]);
  isCreatingProduct = true;
  protected readonly parseInt = parseInt;
  protected readonly parseFloat = parseFloat;
  constructor(private store: Store<{product: ProductModel}>, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.categories$ = this.loadCategories();
    this.route.paramMap.pipe(
      switchMap(async (params) => {
        const productId = Number(params.get("productId"));
        if(productId) {
          this.isCreatingProduct = false;
          this.store.dispatch(loadProductByIdActions.loadProductById({productId: productId}));
          return this.store.pipe(select(selectProduct));
        }
        return of({} as ProductModel);
      }),
      take(1)
    ).subscribe(product => {
      this.product$ = product;
      product.pipe(map(product => product?.categories?.map(cat => cat.id ))).subscribe(cat => {
        this.chosenCategories = cat;
      })
    });
  }
  onInputChange(inputType: string, value: string ): void {
    this.values[inputType] = value;
  }
  private navigateToProductList(): void {
    this.router.navigate(['/admin/products']);
  }

  loadCategories(): Observable<CategoryModel[]|undefined>{
    this.store.dispatch(loadCategoriesActions.loadCategories());
    return this.store.pipe(select(selectCategories))
  }
  saveProduct(product: ProductModel) {
    let updatedCategories: CategoryModel [] | undefined = [];

    this.categories$.pipe(take(1)).subscribe(categories => {
      this.chosenCategories?.forEach(categoryId => {
        const category = categories?.find(c => c.id === categoryId);
        if (category) {
          updatedCategories?.push(category);
        }
      });
    })

    const updatedProduct = {...product, categories: updatedCategories || undefined };

    if (!this.isCreatingProduct && product.id) {
      this.store.dispatch(updateProductActions.updateProduct({productId: product.id, updatedProduct: updatedProduct}));
    } else {
      this.store.dispatch(createProductActions.createProduct({product: updatedProduct}));
    }
    this.store.pipe(select(selectProductState), catchError(error => {
      return of(error)
    })).subscribe(productState => {
      if(productState?.productModified) {
        this.showSuccessSnackBar("Changes saved")
        this.navigateToProductList();
      } else {
        this.showErrorSnackBar("Changes weren't saved")
        console.error("Product not modified: ", productState?.error)
      }
    })
  }

  removeProduct(productId: number) {
    this.store.dispatch(deleteProductActions.deleteProduct({productId}));
    this.store.pipe(select(selectProductState)).subscribe(productState => {
      if (productState.productRemoved) {
        this.navigateToProductList();
        this.showSuccessSnackBar('Product successfully deleted');
      } else if (productState?.error) {
        this.showSuccessSnackBar('Product deleting failed');
      }
    })
  }

  private showSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: 'success-snackbar' });
  }

  private showErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: 'error-snackbar' });
  }

}
