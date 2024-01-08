import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {InputComponent} from "./components/shared/input/input.component";
import {ButtonComponent} from "./components/shared/button/button.component";
import {LoginComponent} from "./pages/login/login.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {HomeComponent} from "./pages/home/home.component";
import {UsersListComponent as AdminUsersComponent} from "./pages/admin/pages/users/users-list.component";
import {LayoutComponent} from "./components/shared/layout/layout.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    RouterOutlet,

    ButtonComponent,
    InputComponent,

    HomeComponent,
    LoginComponent,
    SignUpComponent,

    AdminUsersComponent,

    LayoutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smokeOnTheWaterFront';
}
