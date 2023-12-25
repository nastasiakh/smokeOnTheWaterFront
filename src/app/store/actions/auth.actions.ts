import {createAction, props} from "@ngrx/store";
import {SignUpDto} from "../../dtos/signUp.dto";

export const login = createAction('[Auth] Login', props<{email: string, password: string}>());
export const loginSuccess = createAction('[Auth] Login Success', props<{token: string}>());
export const loginFailure = createAction('[Auth] Login Failure', props<{error: string}>());

export const signUp = createAction('[Auth] Sign Up', props<SignUpDto>());
export const signUpSuccess = createAction('[Auth] Sign Up Success', props<{user: SignUpDto}>());
export const signUpFailure = createAction('[Auth] Sign Up Failure', props<{error: string}>());
