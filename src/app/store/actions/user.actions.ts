import { createAction, props } from "@ngrx/store";
import {UserModel} from "../../models/UserModel";

export const createUser = createAction(
  "[User] Create User",
  props<{ user: UserModel }>()
);

export const createUserSuccess = createAction(
  "[User] Create User Success",
  props<{ user: any }>()
);

export const createUserFailure = createAction(
  "[User] Create User Failure",
  props<{ error: string }>()
);

export const updateUser = createAction(
  "[User] Update User",
  props<{ userId: number, updatedUser: UserModel }>()
);

export const updateUserSuccess = createAction(
  "[User] Update User Success",
  props<{ user: UserModel }>()
);

export const updateUserFailure = createAction(
  "[User] Update User Failure",
  props<{ error: string }>()
);
export const deleteUser= createAction(
  "[User] Delete User",
  props<{ userId: number }>()
);
export const deleteUserSuccess = createAction(
  "[User] Delete User Success",
  props<{ user: UserModel }>()
);

export const deleteUserFailure = createAction(
  "[User] Delete User Failure",
  props<{ error: string }>()
);
export const loadUserById = createAction(
  "[User] Load User By Id",
  props<{ userId: number }>()
);

export const loadUserSuccess = createAction(
  "[User] Load User Success",
  props<{ user: UserModel }>()
);
export const loadUserFailure = createAction(
  "[User] Load User Failure",
  props<{ error: string }>()
);

export const loadUsers = createAction(
  "[User] Load Users"
);

export const loadUsersSuccess = createAction(
  "[User] Load Users Success",
  props<{ users: UserModel[] }>()
);

export const loadUsersFailure = createAction(
  "[User] Load Users Failure",
  props<{ error: string }>()
);
