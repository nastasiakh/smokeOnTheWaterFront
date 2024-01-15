import {createAction, createActionGroup, emptyProps, props} from "@ngrx/store";
import {RoleModel} from "../../models/RoleModel";
import {UserModel} from "../../models/UserModel";

export const createRoleActions = createActionGroup({
  source: "role",
  events: {
    "Create Role": props<{ role: RoleModel }>(),
    "Create Role Success": emptyProps(),
    "Create Role Failure": props<{ error: string  }>(),
  }
});

export const loadRolesActions = createActionGroup({
  source: "role",
  events: {
    "Load Roles": emptyProps(),
    "Load Roles Success": props<{ roles: RoleModel[] }>(),
    "Load Roles Failure": props<{ error: string  }>(),
  }
});

export const loadRoleByIdActions = createActionGroup({
  source: "role",
  events: {
    "Load Role By Id": props<{ roleId: number }>(),
    "Load Role By Id Success": props<{ role: RoleModel }>(),
    "Load Role By Id Failure": props<{ error: string  }>(),
  }
});

export const updateRoleActions = createActionGroup({
  source: "role",
  events: {
    "Update Role": props<{ roleId: number, updatedRole: RoleModel }>(),
    "Update Role Success": props<{ role: RoleModel }>(),
    "Update Role Failure": props<{ error: string  }>(),
  }
});

export const deleteRoleActions = createActionGroup({
  source: "role",
  events: {
    "Delete Role": props<{ roleId: number }>(),
    "Delete Role Success": props<{ role: RoleModel }>(),
    "Delete Role Failure": props<{ error: string  }>(),
  }
});
