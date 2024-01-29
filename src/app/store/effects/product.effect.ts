import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProductService} from "../../services/product/product.service";
import * as ProductActions from "../actions/product.action";
import {catchError, map, mergeMap, of, switchMap} from "rxjs";

@Injectable()
export class ProductEffect {
  createProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.createProductActions.createProduct),
    mergeMap(product => {
      return this.productService.createProduct(product.product)
        .pipe(
          map(() => ProductActions.createProductActions.createProductSuccess()),
          catchError(error => of(ProductActions.createProductActions.createProductFailure(error)))
        )
      }
    )
  ));

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.updateProductActions.updateProduct),
    mergeMap(action => this.productService.updateProduct(action.productId, action.updatedProduct)
      .pipe(
        map(product => ProductActions.updateProductActions.updateProductSuccess(product)),
        catchError(error => of(ProductActions.updateProductActions.updateProductFailure(error)))
      ))
  ));

  loadProducts$ = createEffect( () => this.actions$.pipe(
    ofType(ProductActions.loadProductsActions.loadProducts),
    switchMap(() => this.productService.getProducts().pipe(
      map(products => ProductActions.loadProductsActions.loadProductsSuccess({ products })),
      catchError(error => of(ProductActions.loadProductsActions.loadProductsFailure(error)))
    ))
  ));

  loadProductById$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.loadProductByIdActions.loadProductById),
    mergeMap(action => this.productService.getProductById(action.productId).pipe(
      map( product => ProductActions.loadProductByIdActions.loadProductByIdSuccess({ product })),
      catchError(error => of(ProductActions.loadProductByIdActions.loadProductByIdFailure(error)))
    ))
  ));

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.deleteProductActions.deleteProduct),
    mergeMap(action => this.productService.deleteProduct(action.productId).pipe(
      map(product => ProductActions.deleteProductActions.deleteProductSuccess(product)),
      catchError(error => of(ProductActions.deleteProductActions.deleteProductFailure(error)))
    ))
  ))

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

}
