import {CategoryModel} from "./CategoryModel";

export interface ProductModel {
  id?: number;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  sku: string;
  quantity: number;
  images: string;
  price: number;
  categories?: CategoryModel[];
}
