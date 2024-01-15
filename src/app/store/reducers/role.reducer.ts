import {RoleModel} from "../../models/RoleModel";
import {createReducer, on} from "@ngrx/store";
import * as RoleActions from "../actions/role.action";
import {state} from "@angular/animations";
import * as UserActions from "../actions/user.action";

export interface RoleState {
  roles?: RoleModel[];
  role?: RoleModel;
  roleModified?: boolean;
  roleRemoved?: boolean;
  loading?: boolean;
  error?: string | null;
}

export const initialRoleState: RoleState = {};

export const roleReducer = createReducer(
  initialRoleState,
  on(RoleActions.createRoleActions.createRole, (state, {role}) => ({...state, loading: true})),
  on(RoleActions.loadRolesActions.loadRoles, (state) => ({...state, loading: true, roleRemoved: false})),
  on(RoleActions.loadRoleByIdActions.loadRoleById, (state, {roleId}) => ({...state, loading: true})),
  on(RoleActions.updateRoleActions.updateRole, (state, {roleId, updatedRole}) => {
    return {...state, loading: true}
  }),
  on(RoleActions.deleteRoleActions.deleteRole, (state, {roleId}) => ({...state, loading: true})),

  on(RoleActions.createRoleActions.createRoleSuccess, (state) => ({
    ...state,
    loading: false,
    roleModified: true,
    error: null
  })),
  on(RoleActions.loadRolesActions.loadRolesSuccess, (state, {roles}) => ({
    ...state,
    loading: false,
    roles: roles,
    roleModified: false,
    error: null
  })),
  on(RoleActions.loadRoleByIdActions.loadRoleByIdSuccess, (state, {role}) => ({
    ...state,
    loading: false,
    role: role,
    roleModified: false,
    error: null
  })),
  on(RoleActions.updateRoleActions.updateRoleSuccess, (state, {role}) => {
    return {
    ...state,
      loading: false,
      roleModified: true,
      error: null
    }
  }),
  on(RoleActions.deleteRoleActions.deleteRoleSuccess, (state) => ({
    ...state,
    loading: false,
    roleRemoved: true,
    error: null
  })),

  on(RoleActions.createRoleActions.createRoleFailure, (state, { error }) => ({ ...state, loading: false, error: error })),
  on(RoleActions.loadRolesActions.loadRolesFailure, (state, { error }) => ({ ...state, loading: false, error: error })),
  on(RoleActions.loadRoleByIdActions.loadRoleByIdFailure, (state, { error }) => ({ ...state, loading: false, error: error })),
  on(RoleActions.updateRoleActions.updateRoleFailure, (state, { error }) => {
    return { ...state, loading: false, error: error }
  }),
  on(RoleActions.deleteRoleActions.deleteRoleFailure, (state, { error }) => ({ ...state, loading: false, error: error })),
)
