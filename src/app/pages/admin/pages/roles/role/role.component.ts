import { Component } from '@angular/core';
import {ButtonComponent} from "../../../../../components/shared/button/button.component";
import {InputComponent} from "../../../../../components/shared/input/input.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {RoleModel} from "../../../../../models/RoleModel";
import {select, Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {
  createRoleActions,
  deleteRoleActions,
  loadRoleByIdActions,
  updateRoleActions
} from "../../../../../store/actions/role.action";
import {selectPermissions, selectRole, selectRoleState} from "../../../../../store/selectors/selectors";
import {catchError, map, Observable, of, switchMap, take} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {PermissionModel} from "../../../../../models/PermissionModel";
import {FormsModule} from "@angular/forms";
import {loadPermissionsActions} from "../../../../../store/actions/permission.action";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";


@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    MatFormFieldModule,
    NgIf,
    AsyncPipe,
    MatCheckboxModule,
    FormsModule,
    NgForOf
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
  values: { [key: string]: string } = {};
  role$: Observable<RoleModel | null> = of({} as RoleModel);
  permissions$: Observable<PermissionModel[] | null> = of({} as PermissionModel[])
  givenPermissions: number[] | undefined = [];
  previousGivenPermissions: number[]|undefined = [];
  isCreatingRole = true;
  allGiven: boolean = false;
  constructor(private store: Store, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(async (params) => {
        const roleId = Number(params.get("roleId"));
        if(roleId) {
          this.isCreatingRole = false;
          this.store.dispatch(loadRoleByIdActions.loadRoleById({roleId: roleId}));
          return this.store.pipe(select(selectRole));
        }
        return of({} as RoleModel);
      }),
      take(1)
    ).subscribe(role => {
      this.role$ = role;
      role.pipe(map(role => role?.permissions?.map(permission =>permission.id))).subscribe(permission => {
        this.givenPermissions = permission
        })
    });
    this.permissions$ = this.loadPermissions();
  }

  onInputChange(inputType: string, value: string): void {
    this.values[inputType] = value;
  }
  private navigateToRolesList(): void {
    this.router.navigate(['/admin/roles']);
  }

  trackById(index: number, item: PermissionModel): number {
    return item.id;
  }
  togglePermission(permissionId: number): void {
    const index = this.givenPermissions?.indexOf(permissionId);

    if (index === -1) {
      this.givenPermissions?.push(permissionId);
    } else if (index){
      this.givenPermissions?.splice(index, 1);
    }
  }
  giveAllPermissions(completed: boolean) {
    this.allGiven = completed;
    if (completed ) {
      this.previousGivenPermissions = [...this.givenPermissions?.length ? this.givenPermissions : []];
      this.permissions$.subscribe(permissions => {
        this.givenPermissions = permissions?.map(permission => permission.id) || [];
      });
    } else {
      this.givenPermissions = this.previousGivenPermissions;
      this.previousGivenPermissions = [];
    }
  }
  loadPermissions(): Observable<PermissionModel[] | null>{
    this.store.dispatch(loadPermissionsActions.loadPermissions());
    return this.store.pipe(select(selectPermissions))
  }

  saveRole(role: RoleModel) {
    let updatedPermissions: PermissionModel[] | undefined = [];

    this.permissions$.pipe(take(1)).subscribe(permissions => {
      this.givenPermissions?.forEach(permissionId => {
        const permission = permissions?.find(p => p.id === permissionId);
        if (permission) {
          updatedPermissions?.push(permission);
        }
      })
    })
    const updatedRole = {...role, permissions: updatedPermissions || undefined}
    if (!this.isCreatingRole && role.id) {
      this.store.dispatch(updateRoleActions.updateRole({roleId: role.id, updatedRole: updatedRole}));
    } else {
      this.store.dispatch(createRoleActions.createRole({role: updatedRole}));
    }
    this.store.pipe(select(selectRoleState),  catchError(error => {
      return of(error)
    })).subscribe(roleState => {
      if(roleState?.roleModified) {
        this.navigateToRolesList();
        this.showSuccessSnackBar("Changes saved")
      } else if (roleState?.error){
        this.showErrorSnackBar("Changes weren't saved")
        console.error("Changes weren't saved ", roleState?.error.error)
      }
    })
  }

  removeRole(roleId: number) {
    this.store.dispatch(deleteRoleActions.deleteRole({roleId}));
    this.store.pipe(select(selectRoleState)).subscribe(roleState => {
      if (roleState.roleRemoved) {
        this.navigateToRolesList();
        this.showSuccessSnackBar('Roles successfully deleted');
      } else {
        this.showSuccessSnackBar('Role deleting failed');
      }
    })
  }

  private showSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: 'success-snackbar' });
  }

  private showErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: 'error-snackbar' });
  }

}
