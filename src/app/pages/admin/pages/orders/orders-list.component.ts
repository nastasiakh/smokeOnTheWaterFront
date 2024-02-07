import { Component } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {loadOrdersActions} from "../../../../store/actions/order.action";
import {OrderModel} from "../../../../models/OrderModel";
import {selectOrders} from "../../../../store/selectors/selectors";
import {ButtonComponent} from "../../../../components/shared/button/button.component";
import {EntitiesListComponent} from "../../../../components/shared/entities-list/entities-list.component";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [
    ButtonComponent,
    EntitiesListComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {
  displayedColumns: string[] = ['id', 'status', 'creating date', 'total amount', 'customer name'];
  ordersData: OrderModel[] = [];
  dataSource: any[] = [];
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadOrderData()
  }

  loadOrderData(): void {
    this.store.dispatch(loadOrdersActions.loadOrders());
    this.store.pipe(select(selectOrders)).subscribe(ordersWithProds => {
      if(ordersWithProds) {
        this.ordersData = ordersWithProds.map(({order, orderProducts}) => order)
        this.dataSource = this.ordersData.map(order => {
          const date = new Date(order.dateCreated)
          return {
            id: order.id,
            status: order.status,
            "creating date": `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
            "total amount": order.totalAmount,
            "customer name": `${order.firstName} ${order.lastName}`
          }
        })
      }
    })
  }
}
