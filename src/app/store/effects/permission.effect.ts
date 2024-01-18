import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PermissionService} from "../../services/permission/permission.service";
import * as PermissionActions from "../actions/permission.action";
import {catchError, map, mergeMap, of} from "rxjs";

@Injectable()
export class PermissionEffect {

  loadPermissions$ = createEffect(() => this.actions$.pipe(
    ofType(PermissionActions.loadPermissionsActions.loadPermissions),
    mergeMap(() => this.permissionService.getPermissions().pipe(
      map(permissions => PermissionActions.loadPermissionsActions.loadPermissionsSuccess({permissions})),
      catchError( error => of(PermissionActions.loadPermissionsActions.loadPermissionsFailure(error)))
    ))
  ))

  constructor(
    private actions$: Actions,
    private permissionService: PermissionService
  ) {
  }
}
