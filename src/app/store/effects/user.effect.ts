import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../../services/user/user.service";
import * as UserActions from "../actions/user.action";
import {catchError, concatMap, map, mergeMap, of, switchMap} from "rxjs";

@Injectable()
export class UserEffect {
  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.createUserActions.createUser),
    mergeMap(user => {
      return this.userService.createUser(user.user)
        .pipe(
          map(() => UserActions.createUserActions.createUserSuccess()),
          catchError(error => of(UserActions.createUserActions.createUserFailure(error)))
        )
      }
    )
  ));

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.updateUserActions.updateUser),
    mergeMap(action => this.userService.updateUser(action.userId, action.updatedUser)
      .pipe(
        map(user => UserActions.updateUserActions.updateUserSuccess(user)),
        catchError(error => of(UserActions.updateUserActions.updateUserFailure(error)))
      ))
  ));

  loadUsers$ = createEffect( () => this.actions$.pipe(
    ofType(UserActions.loadUsersActions.loadUsers),
    switchMap(() => this.userService.getUsers().pipe(
      map(users => UserActions.loadUsersActions.loadUsersSuccess({ users })),
      catchError(error => of(UserActions.loadUsersActions.loadUsersFailure(error)))
    ))
  ));

  loadUserById$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUserByIdActions.loadUserById),
    mergeMap(action => this.userService.getUserById(action.userId).pipe(
      map( user => UserActions.loadUserByIdActions.loadUserByIdSuccess({ user })),
      catchError(error => of(UserActions.loadUserByIdActions.loadUserByIdFailure(error)))
    ))
  ));

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.deleteUserActions.deleteUser),
    mergeMap(action => this.userService.deleteUser(action.userId).pipe(
      map(user => UserActions.deleteUserActions.deleteUserSuccess(user)),
      catchError(error => of(UserActions.deleteUserActions.deleteUserFailure(error)))
    ))
  ))

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

}
