import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {OrderService} from "../../services/order/order.service";
import * as OrderActions from "../actions/order.action";
import {catchError, map, mergeMap, of, switchMap} from "rxjs";

@Injectable()
export class OrderEffect {
  createOrder$ = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.createOrderActions.createOrder),
    mergeMap(order => {
      return this.orderService.createOrder(order.order)
        .pipe(
          map(() => OrderActions.createOrderActions.createOrderSuccess()),
          catchError(error => of(OrderActions.createOrderActions.createOrderFailure(error)))
        )
      }
    )
  ));

  updateOrder$ = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.updateOrderActions.updateOrder),
    mergeMap(action => this.orderService.updateOrder(action.orderId, action.updatedOrder)
      .pipe(
        map(order => OrderActions.updateOrderActions.updateOrderSuccess(order)),
        catchError(error => of(OrderActions.updateOrderActions.updateOrderFailure(error)))
      ))
  ));

  loadOrders$ = createEffect( () => this.actions$.pipe(
    ofType(OrderActions.loadOrdersActions.loadOrders),
    switchMap(() => this.orderService.getOrders().pipe(
      map(orders => OrderActions.loadOrdersActions.loadOrdersSuccess({ orders })),
      catchError(error => of(OrderActions.loadOrdersActions.loadOrdersFailure(error)))
    ))
  ));

  loadOrderById$ = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.loadOrderByIdActions.loadOrderById),
    mergeMap(action => this.orderService.getOrderById(action.orderId).pipe(
      map( order => OrderActions.loadOrderByIdActions.loadOrderByIdSuccess({ order })),
      catchError(error => of(OrderActions.loadOrderByIdActions.loadOrderByIdFailure(error)))
    ))
  ));

  deleteOrder$ = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.deleteOrderActions.deleteOrder),
    mergeMap(action => this.orderService.deleteOrder(action.orderId).pipe(
      map(order => OrderActions.deleteOrderActions.deleteOrderSuccess(order)),
      catchError(error => of(OrderActions.deleteOrderActions.deleteOrderFailure(error)))
    ))
  ))

  constructor(
    private actions$: Actions,
    private orderService: OrderService
  ) {}

}
