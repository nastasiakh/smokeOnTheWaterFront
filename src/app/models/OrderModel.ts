import {AddressModel} from "./AddressModel";

export interface OrderModel {
  id?: number;
  totalAmount: number;
  dateCreated: Date;
  dateModified: Date;
  status: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: AddressModel;
  customerId?: number;
}
