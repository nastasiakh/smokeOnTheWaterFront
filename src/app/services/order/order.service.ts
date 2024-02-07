import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {OrderWithProductsModel} from "../../models/OrderWithProductsModel";
import {Observable} from "rxjs";
import {UserModel} from "../../models/UserModel";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders/`;
  constructor(private http: HttpClient) { }

  createOrder(newOrder: OrderWithProductsModel): Observable<{ order: OrderWithProductsModel }> {
    return this.http.post<{order: OrderWithProductsModel}>(this.apiUrl, newOrder);
  }

  updateOrder(orderId: number, updatedOrder: any): Observable<{ order: OrderWithProductsModel }> {
    const url = `${this.apiUrl}${orderId}`;
    return this.http.put<{order: OrderWithProductsModel}>(url, updatedOrder)
  }

  getOrders(): Observable<OrderWithProductsModel[]> {
    return this.http.get<OrderWithProductsModel[]>(this.apiUrl);
  }

  getOrderById(orderId: number): Observable<OrderWithProductsModel> {
    const url = `${this.apiUrl}${orderId}`;
    return this.http.get<OrderWithProductsModel>(url);
  }

  deleteOrder(orderId: number): Observable<{ order: OrderWithProductsModel }> {
    const url = `${this.apiUrl}${orderId}`;
    return this.http.delete<{order: OrderWithProductsModel}>(url);
  }


}
