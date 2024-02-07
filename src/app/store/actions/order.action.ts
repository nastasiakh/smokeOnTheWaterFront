import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {OrderWithProductsModel} from "../../models/OrderWithProductsModel";


export const createOrderActions = createActionGroup({
  source: "order",
  events: {
    "Create Order": props<{ order: OrderWithProductsModel }>(),
    "Create Order Success": emptyProps(),
    "Create Order Failure": props<{ error: string }>()
  }
});

export const updateOrderActions = createActionGroup({
  source: "order",
  events: {
    "Update Order": props<{ orderId: number, updatedOrder: OrderWithProductsModel }>(),
    "Update Order Success": props<{ order: OrderWithProductsModel }>(),
    "Update Order Failure": props<{ error: string }>()
  }
});

export const deleteOrderActions = createActionGroup({
  source: "order",
  events: {
    "Delete Order": props<{ orderId: number }>(),
    "Delete Order Success": props<{ order: OrderWithProductsModel }>(),
    "Delete Order Failure": props<{ error: string }>()
  }
});

export const loadOrderByIdActions = createActionGroup({
  source: "order",
  events: {
    "Load Order By Id": props<{ orderId: number }>(),
    "Load Order By Id Success": props<{ order: OrderWithProductsModel }>(),
    "Load Order By Id Failure": props<{ error: string }>()
  }
});

export const loadOrdersActions = createActionGroup({
  source: "order",
  events: {
    "Load Orders": emptyProps(),
    "Load Orders Success": props<{ orders: OrderWithProductsModel[] }>(),
    "Load Orders Failure": props<{ error: string }>()
  }
});
