import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {ProductModel} from "../../models/ProductModel";


export const createProductActions = createActionGroup({
  source: "product",
  events: {
    "Create Product": props<{ product: ProductModel }>(),
    "Create Product Success": emptyProps(),
    "Create Product Failure": props<{ error: string }>()
  }
});


export const updateProductActions = createActionGroup({
  source: "product",
  events: {
    "Update Product": props<{ productId: number, updatedProduct: ProductModel }>(),
    "Update Product Success": props<{ product: ProductModel }>(),
    "Update Product Failure": props<{ error: string }>()
  }
});

export const deleteProductActions = createActionGroup({
  source: "product",
  events: {
    "Delete Product": props<{ productId: number }>(),
    "Delete Product Success": props<{ product: ProductModel }>(),
    "Delete Product Failure": props<{ error: string }>()
  }
});

export const loadProductByIdActions = createActionGroup({
  source: "product",
  events: {
    "Load Product By Id": props<{ productId: number }>(),
    "Load Product By Id Success": props<{ product: ProductModel }>(),
    "Load Product By Id Failure": props<{ error: string }>()
  }
});

export const loadProductsActions = createActionGroup({
  source: "product",
  events: {
    "Load Products": emptyProps(),
    "Load Products Success": props<{ products: ProductModel[] }>(),
    "Load Products Failure": props<{ error: string }>()
  }
});
