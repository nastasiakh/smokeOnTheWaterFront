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
import {RoleComponent as AdminRoleComponent} from "./pages/admin/pages/roles/role/role.component";
import {LayoutComponent} from "./components/shared/layout/layout.component";
import {
  MatSnackBarAction,
  MatSnackBarContainer,
  MatSnackBarModule
} from "@angular/material/snack-bar";


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

    HomeComponent,
    LoginComponent,
    SignUpComponent,

    AdminUsersComponent,
    AdminUserComponent,
    AdminRolesComponent,
    AdminRoleComponent,

    LayoutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smokeOnTheWaterFront';
}
