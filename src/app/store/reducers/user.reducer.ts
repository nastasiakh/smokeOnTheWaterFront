import {createReducer, on} from "@ngrx/store";
import * as UserActions from '../actions/user.actions';
import {UserModel} from "../../models/UserModel";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";


export interface UserState {
  users?: UserModel[];
  user?: UserModel;
  loading?: boolean;
  error?: string | null;
}

export const initialUserState: UserState = {};

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.createUser, (state, { user }) => ({ ...state, loading: true })),
  on(UserActions.createUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loading: false,
    error: null
  })),
  on(UserActions.createUserFailure, (state, { error }) => ({ ...state, error: error })),

  on(UserActions.updateUser, (state, { userId, updatedUser }) => ({ ...state, loading: true })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loading: false,
    error: null
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({ ...state, error: error })),

  on(UserActions.deleteUser, (state, { userId }) => ({ ...state, loading: true })),
  on(UserActions.deleteUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loading: false,
    error: null
  })),
  on(UserActions.deleteUserFailure, (state, { error }) => ({ ...state, error: error })),

  on(UserActions.loadUserById, (state, { userId }) => ({ ...state, loading: true })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loading: false,
    error: null
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({ ...state, error: error })),

  on(UserActions.loadUsers, (state) => ({ ...state, loading: true })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: users
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({ ...state, error: error })),
)
