import {OrderModel} from "./OrderModel";
import {OrderProductModel} from "./OrderProductModel";

export interface OrderWithProductsModel {
  order: OrderModel;
  orderProducts: OrderProductModel[];
}
