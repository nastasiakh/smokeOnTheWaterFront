import {Component} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {loadUsersActions} from "../../../../store/actions/user.action";
import {selectUsers} from "../../../../store/selectors/selectors";
import {UserModel} from "../../../../models/UserModel";
import {EntitiesListComponent} from "../../../../components/shared/entities-list/entities-list.component";
import {ButtonComponent} from "../../../../components/shared/button/button.component";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {ProvidePermissionCheck} from "../../../../utils/providePermissionCheck";

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [EntitiesListComponent, ButtonComponent, RouterLink, NgIf],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'roles'];
  userData: UserModel[] = [];
  dataSource: any[] = [];

  constructor(private store: Store, protected permissionCheck: ProvidePermissionCheck) {
  }

  ngOnInit(): void {
    this.loadUserData();

  }

  loadUserData(): void {
    this.store.dispatch(loadUsersActions.loadUsers());
    this.store.pipe(select(selectUsers)).subscribe(users => {
      if (users) {
        this.userData = users;
        this.dataSource = this.userData.map(user => {
          return {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            phone: user.phone,
            roles: user.roles?.map(role => role.name).join(', ')
          }
        })
      }
    })
  }
}
