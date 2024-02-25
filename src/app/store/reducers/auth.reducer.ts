import {createReducer, on} from "@ngrx/store";
import * as AuthActions from '../actions/auth.action';
import {UserModel} from "../../models/UserModel";
import {SignUpDto} from "../../dtos/signUp.dto";
export interface AuthState {
  token: string | null;
  newUser: SignUpDto | null;
  user: UserModel | null;
  error: string | null;
}

export const initialState: AuthState = {
  token: null,
  newUser: null,
  user: null,
  error: null
}

export const authReducer = createReducer(
  initialState,
  on(AuthActions.authorisationActions.login, (state,  { email, password }) => (state)),
  on(AuthActions.authorisationActions.loginSuccess, (state, { token, user}) => ({ ...state, token , user})),
  on(AuthActions.authorisationActions.loginFailure, (state, { error }) => ({ ...state, error})),

  on(AuthActions.authorisationActions.signUp, (state,  { newUser }) => (state)),
  on(AuthActions.authorisationActions.signUpSuccess, (state, { token }) => ({ ...state, token })),
  on(AuthActions.authorisationActions.signUpFailure, (state, { error }) => ({ ...state, error})),
)
