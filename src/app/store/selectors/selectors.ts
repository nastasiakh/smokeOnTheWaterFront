import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserState} from "../reducers/user.reducer";
import {RoleState} from "../reducers/role.reducer";
import {AuthState} from "../reducers/auth.reducer";
import {PermissionModel} from "../../models/PermissionModel";
import {PermissionState} from "../reducers/permission.reducer";


export interface AppState{
  users: UserState;
  roles: RoleState;
  auth: AuthState;
}

export const selectUserState = createFeatureSelector<UserState>("users");
export const selectRoleState = createFeatureSelector<RoleState>("roles");
export const selectPermissionState = createFeatureSelector<PermissionState>("permissions");
export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user || null
);

export const selectRoles = createSelector(
  selectRoleState,
  (state) => state.roles
);
export const selectRole = createSelector(
  selectRoleState,
  (state) => state.role || null
);

export const selectPermissions = createSelector(
  selectPermissionState,
  (state) => state.permissions || null
);
