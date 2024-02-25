import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {authReducer} from "./store/reducers/auth.reducer";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffect} from "./store/effects/auth.effect";
import {userReducer} from "./store/reducers/user.reducer";
import {UserEffect} from "./store/effects/user.effect";
import {roleReducer} from "./store/reducers/role.reducer";
import {RoleEffect} from "./store/effects/role.effect";
import {permissionReducer} from "./store/reducers/permission.reducer";
import {PermissionEffect} from "./store/effects/permission.effect";
import {productReducer} from "./store/reducers/product.reducer";
import {ProductEffect} from "./store/effects/product.effect";
import {categoryReducer} from "./store/reducers/category.reducer";
import {CategoryEffect} from "./store/effects/category.effect";
import {orderReducer} from "./store/reducers/order.reducer";
import {OrderEffect} from "./store/effects/order.effect";
import {HomeComponent} from "./pages/home/home.component";
import {adminAuthGuard} from "./guards/auth/admin-auth.guard";
import {HomeComponent as AdminHomeComponent} from "./pages/admin/pages/home/home.component";
import {UsersListComponent} from "./pages/admin/pages/users/users-list.component";
import {UserComponent} from "./pages/admin/pages/users/user/user.component";
import {RolesListComponent} from "./pages/admin/pages/roles/roles-list.component";
import {RoleComponent} from "./pages/admin/pages/roles/role/role.component";
import {CategoriesListComponent} from "./pages/admin/pages/categories/categories-list.component";
import {CategoryComponent} from "./pages/admin/pages/categories/category/category.component";
import {ProductsListComponent} from "./pages/admin/pages/products/products-list.component";
import {ProductComponent} from "./pages/admin/pages/products/product/product.component";
import {OrdersListComponent} from "./pages/admin/pages/orders/orders-list.component";
import {OrderComponent} from "./pages/admin/pages/orders/order/order.component";

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/sign-up', component: SignUpComponent },
  { path: 'home', component: HomeComponent},
  { path: 'admin',
    canActivate: [adminAuthGuard],
    canActivateChild: [adminAuthGuard],
    children: [
      { path: 'home', component: HomeComponent},
      { path: 'users', component: UsersListComponent},
      { path: 'users/:userId', component: UserComponent },
      { path: 'users/newUser', component: UserComponent },
      { path: 'roles', component: RolesListComponent },
      { path: 'roles/newRole', component: RoleComponent},
      { path: 'roles/:roleId', component: RoleComponent},
      { path: 'categories', component: CategoriesListComponent},
      { path: 'categories/newCategory', component: CategoryComponent},
      { path: 'categories/:categoryId', component: CategoryComponent},
      { path: 'products', component: ProductsListComponent},
      { path: 'products/newProduct', component: ProductComponent},
      { path: 'products/:productId', component: ProductComponent},
      { path: 'orders', component: OrdersListComponent},
      { path: 'order/newOrder', component: OrderComponent},
      { path: 'orders/:orderId', component: OrderComponent},
    ]
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      auth: authReducer,
      users: userReducer,
      roles: roleReducer,
      permissions: permissionReducer,
      products: productReducer,
      category: categoryReducer,
      order: orderReducer,
    }),
    EffectsModule.forRoot([
      AuthEffect,
      UserEffect,
      RoleEffect,
      PermissionEffect,
      ProductEffect,
      CategoryEffect,
      OrderEffect,
    ])
  ],
  exports: [RouterModule, StoreModule, EffectsModule],
})
export class AppRoutingModule {}
