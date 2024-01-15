import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./pages/home/home.component";
import {HomeComponent as AdminHomeComponent} from "./pages/admin/pages/home/home.component";
import {UsersListComponent as AdminUsersComponent} from "./pages/admin/pages/users/users-list.component";
import {UserComponent as AdminUserComponent} from "./pages/admin/pages/users/user/user.component";
import {RolesListComponent as AdminRolesComponent} from "./pages/admin/pages/roles/roles-list.component";
import {RoleComponent as AdminRoleComponent} from "./pages/admin/pages/roles/role/role.component";
import {StoreModule} from "@ngrx/store";
import {authReducer} from "./store/reducers/auth.reducer";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffect} from "./store/effects/auth.effect";
import {userReducer} from "./store/reducers/user.reducer";
import {UserEffect} from "./store/effects/user.effect";
import {roleReducer} from "./store/reducers/role.reducer";
import {RoleEffect} from "./store/effects/role.effect";

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/sign-up', component: SignUpComponent },

  { path: 'admin/home', component: AdminHomeComponent},
  { path: 'admin/users', component: AdminUsersComponent},
  { path: 'admin/users/:userId', component: AdminUserComponent },
  { path: 'admin/users/newUser', component: AdminUserComponent },
  { path: 'admin/roles', component: AdminRolesComponent },
  { path: 'admin/roles/newRole', component: AdminRoleComponent},
  { path: 'admin/roles/:roleId', component: AdminRoleComponent},

  { path: '', component: HomeComponent},

  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    StoreModule.forRoot({
      auth: authReducer,
      users: userReducer,
      roles: roleReducer,
    }),
    EffectsModule.forRoot([
      AuthEffect,
      UserEffect,
      RoleEffect,
    ])
  ],
  exports: [RouterModule, StoreModule, EffectsModule],
})
export class AppRoutingModule {}
