import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {RoleService} from "../../services/role/role.service";
import * as RoleActions from "../actions/role.action";
import {catchError, map, mergeMap, of, switchMap} from "rxjs";

@Injectable()
export class RoleEffect {

  loadRoles$ = createEffect(() => this.actions$.pipe(
    ofType(RoleActions.loadRolesActions.loadRoles),
    mergeMap(() => this.roleService.getRoles().pipe(
      map(roles => RoleActions.loadRolesActions.loadRolesSuccess({roles})),
      catchError(error => of(RoleActions.loadRolesActions.loadRolesFailure(error)))
    ))
  ))

  loadRoleById$ = createEffect(() => this.actions$.pipe(
    ofType(RoleActions.loadRoleByIdActions.loadRoleById),
    mergeMap(action => this.roleService.getRoleById(action.roleId).pipe(
      map(role => RoleActions.loadRoleByIdActions.loadRoleByIdSuccess({role})),
      catchError(error => of(RoleActions.loadRoleByIdActions.loadRoleByIdFailure(error)))
    ))
  ))

  createRole$ = createEffect(() => this.actions$.pipe(
    ofType(RoleActions.createRoleActions.createRole),
    mergeMap(role => this.roleService.createRole(role.role).pipe(
      map(() => RoleActions.createRoleActions.createRoleSuccess()),
      catchError(error => of(RoleActions.createRoleActions.createRoleFailure(error)))
    ))
  ))

  updateRole$ = createEffect(() => this.actions$.pipe(
    ofType(RoleActions.updateRoleActions.updateRole),
    mergeMap(role => (this.roleService.updateRole(role.roleId, role.updatedRole).pipe(
        map(role => (RoleActions.updateRoleActions.updateRoleSuccess(role))),
        catchError(error => (of(RoleActions.updateRoleActions.updateRoleFailure(error))
        ))
      ))
    )
  ))


  deleteRole$ = createEffect(() => this.actions$.pipe(
    ofType(RoleActions.deleteRoleActions.deleteRole),
    mergeMap(role => this.roleService.deleteRole(role.roleId).pipe(
      map((role) => RoleActions.deleteRoleActions.deleteRoleSuccess({role})),
      catchError(error => of(RoleActions.deleteRoleActions.deleteRoleFailure(error)))
    ))
  ))


  constructor(
    private actions$: Actions,
    private roleService: RoleService
  ) {
  }
}
