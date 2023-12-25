import { Component } from '@angular/core';
import {InputComponent} from "../../components/shared/input/input.component";
import {ButtonComponent} from "../../components/shared/button/button.component";
import {Store} from "@ngrx/store";
import * as AuthActions from "../../store/actions/auth.actions";
import {SignUpDto} from "../../dtos/signUp.dto";
import {ReactiveFormsModule} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  newUser = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  }
  passwordConfirmation : string = '';

  values: { [key: string]: string } = {};


  constructor(private store: Store) {}

  onInputChange(inputType: string, value: string): void {
    this.values[inputType] = value;
  }

  onSignUpClick(newUser: SignUpDto): void {
    if (this.values['password'] !== this.values['passwordConfirmation']) {
      throw new Error();
    }
    this.store.dispatch(AuthActions.signUp(newUser));
  }
}
