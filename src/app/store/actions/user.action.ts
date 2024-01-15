import {createAction, createActionGroup, emptyProps, props} from "@ngrx/store";
import {UserModel} from "../../models/UserModel";
import {SignUpDto} from "../../dtos/signUp.dto";


export const createUserActions = createActionGroup({
  source: "user",
  events: {
    "Create User": props<{ user: UserModel }>(),
    "Create User Success": emptyProps(),
    "Create User Failure": props<{ error: string }>()
  }
});


export const updateUserActions = createActionGroup({
  source: "user",
  events: {
    "Update User": props<{ userId: number, updatedUser: UserModel }>(),
    "Update User Success": props<{ user: UserModel }>(),
    "Update User Failure": props<{ error: string }>()
  }
});

export const deleteUserActions = createActionGroup({
  source: "user",
  events: {
    "Delete User": props<{ userId: number }>(),
    "Delete User Success": props<{ user: UserModel }>(),
    "Delete User Failure": props<{ error: string }>()
  }
});

export const loadUserByIdActions = createActionGroup({
  source: "user",
  events: {
    "Load User By Id": props<{ userId: number }>(),
    "Load User By Id Success": props<{ user: UserModel }>(),
    "Load User By Id Failure": props<{ error: string }>()
  }
});

export const loadUsersActions = createActionGroup({
  source: "user",
  events: {
    "Load Users": emptyProps(),
    "Load Users Success": props<{ users: UserModel[] }>(),
    "Load Users Failure": props<{ error: string }>()
  }
});
