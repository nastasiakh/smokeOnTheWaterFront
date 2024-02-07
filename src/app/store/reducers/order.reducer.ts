import {createReducer, on} from "@ngrx/store";
import * as OrderActions from '../actions/order.action';
import {OrderWithProductsModel} from "../../models/OrderWithProductsModel";


export interface OrderState {
  orders?: OrderWithProductsModel[];
  order?: OrderWithProductsModel;
  orderModified?: boolean;
  orderRemoved?: boolean;
  loading?: boolean;
  error?: string | null;
}

export const initialOrderState: OrderState = {};

export const orderReducer = createReducer(
  initialOrderState,
  on(OrderActions.createOrderActions.createOrder, (state, { order }) => ({ ...state, loading: true })),
  on(OrderActions.createOrderActions.createOrderSuccess, (state) => ({
    ...state,
    orderModified: true,
    loading: false,
    error: null
  })),
  on(OrderActions.createOrderActions.createOrderFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(OrderActions.updateOrderActions.updateOrder, (state, { orderId, updatedOrder }) => ({ ...state, loading: true })),
  on(OrderActions.updateOrderActions.updateOrderSuccess, (state, { order }) => ({
    ...state,
    orderModified: true,
    loading: false,
    error: null
  })),
  on(OrderActions.updateOrderActions.updateOrderFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(OrderActions.deleteOrderActions.deleteOrder, (state, { orderId }) => ({ ...state, loading: true })),
  on(OrderActions.deleteOrderActions.deleteOrderSuccess, (state, { order }) => ({
    ...state,
    order: order,
    orderRemoved: true,
    loading: false,
    error: null
  })),
  on(OrderActions.deleteOrderActions.deleteOrderFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(OrderActions.loadOrderByIdActions.loadOrderById, (state, { orderId }) => ({ ...state, loading: true })),
  on(OrderActions.loadOrderByIdActions.loadOrderByIdSuccess, (state, { order }) => ({
    ...state,
    order: order,
    loading: false,
    error: null,
    orderModified: false,
  })),
  on(OrderActions.loadOrderByIdActions.loadOrderByIdFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(OrderActions.loadOrdersActions.loadOrders, (state) => ({ ...state, loading: true })),
  on(OrderActions.loadOrdersActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders: orders,
    orderModified: false,
    error: null,
  })),
  on(OrderActions.loadOrdersActions.loadOrdersFailure, (state, { error }) => ({ ...state, loading: false, error: error })),
)
