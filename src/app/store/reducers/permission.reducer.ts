import {PermissionModel} from "../../models/PermissionModel";
import {createReducer, on} from "@ngrx/store";
import * as PermissionActions from "../actions/permission.action";

export interface PermissionState {
  permissions?: PermissionModel[],
  loading?: boolean,
  error?: string
}

export const initialPermissionState: PermissionState = {};

export const permissionReducer = createReducer(
  initialPermissionState,
  on(PermissionActions.loadPermissionsActions.loadPermissions, (state) => ({...state, loading: true})),
  on(PermissionActions.loadPermissionsActions.loadPermissionsSuccess, (state, {permissions}) => ({...state, loading: false, permissions: permissions})),
  on(PermissionActions.loadPermissionsActions.loadPermissionsFailure, (state, {error}) => ({...state, loading: false, error: error})),
)
