import {createReducer, on} from "@ngrx/store";
import * as AuthActions from '../actions/auth.action';
import {SignUpDto} from "../../dtos/signUp.dto";
export interface AuthState {
  token: string | null;
  user: SignUpDto | null;
  error: string | null;
}

export const initialState: AuthState = {
  token: null,
  user: null,
  error: null
}

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token }) => ({ ...state, token })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error})),
  on(AuthActions.signUpSuccess, (state, { user }) => ({ ...state, user })),
  on(AuthActions.signUpFailure, (state, { error }) => ({ ...state, error})),
)
