import {createReducer, on} from "@ngrx/store";
import * as ProductActions from '../actions/product.action';
import {ProductModel} from "../../models/ProductModel";


export interface ProductState {
  products?: ProductModel[];
  product?: ProductModel;
  productModified?: boolean;
  productRemoved?: boolean;
  loading?: boolean;
  error?: string | null;
}

export const initialProductState: ProductState = {};

export const productReducer = createReducer(
  initialProductState,
  on(ProductActions.createProductActions.createProduct, (state, { product }) => ({ ...state, loading: true })),
  on(ProductActions.createProductActions.createProductSuccess, (state) => ({
    ...state,
    productModified: true,
    loading: false,
    error: null
  })),
  on(ProductActions.createProductActions.createProductFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(ProductActions.updateProductActions.updateProduct, (state, { productId, updatedProduct }) => ({ ...state, loading: true })),
  on(ProductActions.updateProductActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    productModified: true,
    loading: false,
    error: null
  })),
  on(ProductActions.updateProductActions.updateProductFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(ProductActions.deleteProductActions.deleteProduct, (state, { productId }) => ({ ...state, loading: true })),
  on(ProductActions.deleteProductActions.deleteProductSuccess, (state, { product }) => ({
    ...state,
    product: product,
    productRemoved: true,
    loading: false,
    error: null
  })),
  on(ProductActions.deleteProductActions.deleteProductFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(ProductActions.loadProductByIdActions.loadProductById, (state, { productId }) => ({ ...state, loading: true })),
  on(ProductActions.loadProductByIdActions.loadProductByIdSuccess, (state, { product }) => ({
    ...state,
    product: product,
    loading: false,
    error: null,
    productModified: false,
  })),
  on(ProductActions.loadProductByIdActions.loadProductByIdFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(ProductActions.loadProductsActions.loadProducts, (state) => ({ ...state, loading: true })),
  on(ProductActions.loadProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products: products,
    productModified: false,
    error: null,
  })),
  on(ProductActions.loadProductsActions.loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error: error })),
)
