import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {InputComponent} from "./components/shared/input/input.component";
import {ButtonComponent} from "./components/shared/button/button.component";
import {LoginComponent} from "./pages/login/login.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {HomeComponent} from "./pages/home/home.component";
import {BrowserModule} from "@angular/platform-browser";


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

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smokeOnTheWaterFront';
}
