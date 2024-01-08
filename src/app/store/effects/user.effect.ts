import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../../services/user/user.service";
import * as UserActions from "../actions/user.actions";
import {catchError, concatMap, map, mergeMap, of, switchMap} from "rxjs";

@Injectable()
export class UserEffect {
  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.createUser),
    mergeMap(action => this.userService.createUser(action.user)
      .pipe(
        map(user => UserActions.createUserSuccess({user})),
        catchError(error => of(UserActions.createUserFailure(error)))
      )
    )
  ));

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.updateUser),
    mergeMap(action => this.userService.updateUser(action.userId, action.updatedUser)
      .pipe(
        map(user => UserActions.updateUserSuccess(user)),
        catchError(error => of(UserActions.updateUserFailure(error)))
      ))
  ));

  loadUsers$ = createEffect( () => this.actions$.pipe(
    ofType(UserActions.loadUsers),
    switchMap(() => this.userService.getUsers().pipe(
      map(users => {
        console.log('1', {users})
        console.log('2', users)
        return UserActions.loadUsersSuccess({ users });
      }),
      catchError(error => of(UserActions.loadUsersFailure(error)))
    ))
  ));

  loadUserById$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUserById),
    mergeMap(action => this.userService.getUserById(action.userId).pipe(
      map( user => UserActions.loadUserSuccess(user)),
      catchError(error => of(UserActions.loadUserFailure(error)))
    ))
  ));

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.deleteUser),
    mergeMap(action => this.userService.deleteUser(action.userId).pipe(
      map(user => UserActions.deleteUserSuccess(user)),
      catchError(error => of(UserActions.deleteUserFailure(error)))
    ))
  ))

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

}
