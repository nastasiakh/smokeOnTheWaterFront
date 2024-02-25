import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {InputComponent} from "./components/shared/input/input.component";
import {ButtonComponent} from "./components/shared/button/button.component";
import {EntitiesListComponent} from "./components/shared/entities-list/entities-list.component";
import {LoginComponent} from "./pages/login/login.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {HomeComponent} from "./pages/home/home.component";
import {UsersListComponent as AdminUsersComponent} from "./pages/admin/pages/users/users-list.component";
import {UserComponent as AdminUserComponent} from "./pages/admin/pages/users/user/user.component";
import {RolesListComponent as AdminRolesComponent} from "./pages/admin/pages/roles/roles-list.component";
import {ProductsListComponent as AdminProductsComponent} from "./pages/admin/pages/products/products-list.component";
import {ProductComponent as AdminProductComponent} from "./pages/admin/pages/products/product/product.component";
import {CategoriesListComponent as AdminCategoriesComponent} from "./pages/admin/pages/categories/categories-list.component";
import {CategoryComponent as AdminCategoryComponent} from "./pages/admin/pages/categories/category/category.component";
import {RoleComponent as AdminRoleComponent} from "./pages/admin/pages/roles/role/role.component";
import {OrderComponent as AdminOrderComponent} from "./pages/admin/pages/orders/order/order.component";
import {OrdersListComponent as AdminOrdersComponent} from "./pages/admin/pages/orders/orders-list.component";
import {HomeComponent as AdminHomeComponent} from "./pages/admin/pages/home/home.component";
import {LayoutComponent} from "./components/shared/layout/layout.component";
import {
  MatSnackBarAction,
  MatSnackBarContainer,
  MatSnackBarModule
} from "@angular/material/snack-bar";
import {NavAdminComponent} from "./components/shared/nav-admin/nav-admin.component";
import {HeaderComponent} from "./components/shared/header/header.component";
import {FooterComponent} from "./components/shared/footer/footer.component";
import {HttpClientModule} from "@angular/common/http";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,

    RouterLink,
    RouterModule,
    RouterOutlet,
    MatSnackBarModule,
    MatSnackBarAction,
    MatSnackBarContainer,

    ButtonComponent,
    InputComponent,
    EntitiesListComponent,
    NavAdminComponent,
    HeaderComponent,
    FooterComponent,

    HomeComponent,
    LoginComponent,
    SignUpComponent,

    AdminHomeComponent,
    AdminUsersComponent,
    AdminUserComponent,
    AdminRolesComponent,
    AdminRoleComponent,
    AdminProductsComponent,
    AdminProductComponent,
    AdminCategoriesComponent,
    AdminCategoryComponent,
    AdminOrdersComponent,
    AdminOrderComponent,
    LayoutComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smokeOnTheWaterFront';
}
