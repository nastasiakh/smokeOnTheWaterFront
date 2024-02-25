import {Injectable} from "@angular/core";
import * as AuthActions from '../actions/auth.action';
import {catchError, exhaustMap, map, mergeMap, of} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {routes} from "../../app.routes";

@Injectable()
export class AuthEffect {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.authorisationActions.login),
    mergeMap(({ email, password }) => this.authService.login(email, password)
      .pipe(
        map(({ token, user }) => {
          // this.router.navigateByUrl('admin/home')
          return AuthActions.authorisationActions.loginSuccess({ token, user })
        }),
        catchError(error => of(AuthActions.authorisationActions.loginFailure({error: 'Authentication failed'})))
      )
    )
  ))

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.authorisationActions.signUp),
    exhaustMap(data => this.authService.signUp(data.newUser)
      .pipe(
        map(token => AuthActions.authorisationActions.signUpSuccess(token)),
        catchError(error => of(AuthActions.authorisationActions.signUpFailure({error: 'User creating failed'})))
      )
  ))
)
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

}
