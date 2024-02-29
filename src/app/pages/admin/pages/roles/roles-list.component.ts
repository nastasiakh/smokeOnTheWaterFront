import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../../../../components/shared/button/button.component";
import {EntitiesListComponent} from "../../../../components/shared/entities-list/entities-list.component";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {RoleModel} from "../../../../models/RoleModel";
import {select, Store} from "@ngrx/store";
import {selectRoles} from "../../../../store/selectors/selectors";
import {loadRolesActions} from "../../../../store/actions/role.action";
import {ProvidePermissionCheck} from "../../../../utils/providePermissionCheck";

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [
    ButtonComponent,
    EntitiesListComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.css'
})
export class RolesListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name'];
  rolesData: RoleModel[] = [];
  dataSource: any[] = [];

  constructor(private store: Store, protected permissionCheck: ProvidePermissionCheck) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.store.dispatch(loadRolesActions.loadRoles());
    this.store.pipe(select(selectRoles)).subscribe(roles => {
      if (roles) {
        this.rolesData = roles;
        this.dataSource = this.rolesData.map(role => {
          return {
            id: role.id,
            name: role.name,
            permission: role.permissions?.map(permission => permission).join(', ')
          }
        })
      }
    })
  }
}
