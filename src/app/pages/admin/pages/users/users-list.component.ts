import {Component, Input} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {select, Store} from "@ngrx/store";
import {loadUsers} from "../../../../store/actions/user.actions";
import {selectUsers, selectUserState} from "../../../../store/selectors/user.selector";
import {Observable} from "rxjs";
import {UserModel} from "../../../../models/UserModel";

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  @Input() displayedColumns: string[] = ['name', 'email', 'phone', 'role'];
  dataSource: UserModel[] = [];

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(loadUsers());
    this.store.pipe(select(selectUsers)).subscribe(users => {
      if (users) {
        this.dataSource = users;
      }
    })
  }
}
