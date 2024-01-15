import {createReducer, on} from "@ngrx/store";
import * as UserActions from '../actions/user.action';
import {UserModel} from "../../models/UserModel";


export interface UserState {
  users?: UserModel[];
  user?: UserModel;
  userModified?: boolean;
  userRemoved?: boolean;
  loading?: boolean;
  error?: string | null;
}

export const initialUserState: UserState = {};

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.createUserActions.createUser, (state, { user }) => ({ ...state, loading: true })),
  on(UserActions.createUserActions.createUserSuccess, (state) => ({
    ...state,
    userModified: true,
    loading: false,
    error: null
  })),
  on(UserActions.createUserActions.createUserFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(UserActions.updateUserActions.updateUser, (state, { userId, updatedUser }) => ({ ...state, loading: true })),
  on(UserActions.updateUserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    userModified: true,
    loading: false,
    error: null
  })),
  on(UserActions.updateUserActions.updateUserFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(UserActions.deleteUserActions.deleteUser, (state, { userId }) => ({ ...state, loading: true })),
  on(UserActions.deleteUserActions.deleteUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
    userRemoved: true,
    loading: false,
    error: null
  })),
  on(UserActions.deleteUserActions.deleteUserFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(UserActions.loadUserByIdActions.loadUserById, (state, { userId }) => ({ ...state, loading: true })),
  on(UserActions.loadUserByIdActions.loadUserByIdSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loading: false,
    error: null,
    userModified: false,
  })),
  on(UserActions.loadUserByIdActions.loadUserByIdFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(UserActions.loadUsersActions.loadUsers, (state) => ({ ...state, loading: true })),
  on(UserActions.loadUsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: users,
    userModified: false,
    error: null,
  })),
  on(UserActions.loadUsersActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error: error })),
)
