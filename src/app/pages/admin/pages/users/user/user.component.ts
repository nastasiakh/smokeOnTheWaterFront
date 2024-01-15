import {Component, OnInit} from '@angular/core';
import {InputComponent} from "../../../../../components/shared/input/input.component";
import {select, Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {selectUser, selectUserState} from "../../../../../store/selectors/selectors";
import {UserModel} from "../../../../../models/UserModel";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AsyncPipe, NgIf} from "@angular/common";
import {ButtonComponent} from "../../../../../components/shared/button/button.component";
import {FormsModule} from "@angular/forms";
import {catchError, Observable, of, switchMap, take} from "rxjs";
import {
  createUserActions, deleteUserActions,
  loadUserByIdActions,
  updateUserActions
} from "../../../../../store/actions/user.action";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    InputComponent,
    MatFormFieldModule,
    NgIf,
    ButtonComponent,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  passwordConfirmation = '';
  values: { [key: string]: string } = {};
  user$: Observable<UserModel | null> = of({} as UserModel);
  isCreatingUser = true;
  constructor(private store: Store<{user: UserModel}>, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(async (params) => {
        const userId = Number(params.get("userId"));
        if(userId) {
          this.isCreatingUser = false;
          this.store.dispatch(loadUserByIdActions.loadUserById({userId: userId}));
          return this.store.pipe(select(selectUser));
        }
        return of({} as UserModel);
      }),
      take(1)
    ).subscribe(user => this.user$ = user);
  }

  onInputChange(inputType: string, value: string): void {
    this.values[inputType] = value;
  }
  private navigateToUsersList(): void {
    this.router.navigate(['/admin/users']);
  }

  saveUser(user: UserModel) {
    if (!this.isCreatingUser && user.id) {
      this.store.dispatch(updateUserActions.updateUser({userId: user.id, updatedUser: user}));
    } else {
      this.store.dispatch(createUserActions.createUser({user: user}));
    }
    this.store.pipe(select(selectUserState), catchError(error => {
      return of(error)
    })).subscribe(userState => {
      if(userState?.userModified) {
        this.navigateToUsersList();
        this.showSuccessSnackBar("Changes saved")

      } else {
        this.showErrorSnackBar("Changes weren't saved")

        console.error("User not modified: ", userState?.error)
      }
    })
  }

  removeUser(userId: number) {
    this.store.dispatch(deleteUserActions.deleteUser({userId}));
    this.store.pipe(select(selectUserState)).subscribe(userState => {
      if (userState.userRemoved) {
         this.navigateToUsersList();
        this.showSuccessSnackBar('User successfully deleted');
      } else {
        this.showSuccessSnackBar('User deleting failed');
      }
    })
  }

  private showSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: 'success-snackbar' });
  }

  private showErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: 'error-snackbar' });
  }
}
