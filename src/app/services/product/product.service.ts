import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProductModel} from "../../models/ProductModel";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  constructor( private http: HttpClient) { }

  createProduct(newProduct: ProductModel ): Observable<{ product: ProductModel }> {
    const url = `${this.apiUrl}/products/`;
    return this.http.post<{ product: ProductModel }>(url, newProduct);
  };

  updateProduct(productId: number, updatedProduct: any): Observable<{ product: ProductModel }> {
    const url = `${this.apiUrl}/products/${productId}`;
    return this.http.put<{product: ProductModel}>(url, updatedProduct)
  }

  getProducts(): Observable<ProductModel[]> {
    const url = `${this.apiUrl}/products/`;
    return this.http.get<ProductModel[]>(url);
  }

  getProductById(productId: number): Observable<ProductModel> {
    const url = `${this.apiUrl}/products/${productId}`;
    return this.http.get<ProductModel>(url);
  }

  deleteProduct(productId: number): Observable<{ product: ProductModel }> {
    const url = `${this.apiUrl}/products/${productId}`;
    return this.http.delete<{product: ProductModel}>(url);
  }


}
