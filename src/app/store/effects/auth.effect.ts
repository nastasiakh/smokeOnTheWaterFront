import {Injectable} from "@angular/core";
import * as AuthActions from '../actions/auth.action';
import {catchError, exhaustMap, map, mergeMap, of} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../services/auth/auth.service";

@Injectable()
export class AuthEffect {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    mergeMap(({ email, password }) => this.authService.login(email, password)
      .pipe(
        map(({ token, user }) => {
          location.replace('admin/home')
          return AuthActions.loginSuccess({ token, user })
        }),
        catchError(error => of(AuthActions.loginFailure({error: 'Authentication failed'})))
      )
    )
  ))

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.signUp),
    exhaustMap(data => this.authService.signUp(data)
      .pipe(
        map(user => AuthActions.signUpSuccess({user})),
        catchError(error => of(AuthActions.signUpFailure({error: 'User creating failed'})))
      )
  ))
)
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

}
