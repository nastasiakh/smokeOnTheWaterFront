import { Component } from '@angular/core';
import {InputComponent} from "../../components/shared/input/input.component";
import {NgIf} from "@angular/common";
import {ButtonComponent} from "../../components/shared/button/button.component";
import {Store} from "@ngrx/store";
import * as AuthActions from '../../store/actions/auth.actions';
import { ReactiveFormsModule, } from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputComponent,
    NgIf,
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailValue : string = '';
  passwordValue : string = '';
  values: { [key: string]: string } = {};

  constructor(private store: Store) {}

  onInputChange(inputType: string, value: string): void {
    this.values[inputType] = value;
  }

  onLoginClick(email:string, password: string) {
    this.store.dispatch(AuthActions.login(
        {
          email: email,
          password: password
        }
      ));

  }

}
