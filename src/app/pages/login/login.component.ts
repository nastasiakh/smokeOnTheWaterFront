import { Component } from '@angular/core';
import {InputComponent} from "../../components/shared/input/input.component";
import {NgIf} from "@angular/common";
import {ButtonComponent} from "../../components/shared/button/button.component";
import {select, Store} from "@ngrx/store";
import * as AuthActions from '../../store/actions/auth.action';
import { ReactiveFormsModule, } from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {selectCurrentUser} from "../../store/selectors/selectors";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputComponent,
    NgIf,
    ButtonComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailValue : string = '';
  passwordValue : string = '';
  values: { [key: string]: string } = {};

  constructor(private store: Store, private router: Router) {}

  onInputChange(inputType: string, value: string): void {
    this.values[inputType] = value;
  }

  onLoginClick(email:string, password: string) {
    this.store.dispatch(AuthActions.authorisationActions.login(
        {
          email: email,
          password: password
        }
      ));
    this.store.pipe(select(selectCurrentUser)).subscribe(user => {
      this.router.navigateByUrl('admin/home')
    })
  }

}
