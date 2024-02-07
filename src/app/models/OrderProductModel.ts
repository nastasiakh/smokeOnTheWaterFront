export interface OrderProductModel {
  id?: number;
  orderId?: number;
  productId: number;
  title: string;
  quantity: number;
  price: number;
  sku: string;
}
