import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserState} from "../reducers/user.reducer";


export interface AppState{
  users: UserState;
}

export const selectUserState = createFeatureSelector<UserState>("users");

// export const selectUsers = createSelector(
//   (state: AppState) => state.users,
//   (userState) => userState.users
// );
export const selectUsers = createSelector(
  selectUserState,
  (userState) => userState.users
);
