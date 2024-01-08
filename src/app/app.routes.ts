import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./pages/home/home.component";
import {HomeComponent as AdminHomeComponent} from "./pages/admin/pages/home/home.component";
import {UsersListComponent as AdminUsersComponent} from "./pages/admin/pages/users/users-list.component";
import {StoreModule} from "@ngrx/store";
import {authReducer} from "./store/reducers/auth.reducer";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffect} from "./store/effects/auth.effect";
import {userReducer} from "./store/reducers/user.reducer";
import {UserEffect} from "./store/effects/user.effect";

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/sign-up', component: SignUpComponent },

  { path: 'admin/home', component: AdminHomeComponent},
  { path: 'admin/users', component: AdminUsersComponent},
  { path: '', component: HomeComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    StoreModule.forRoot({
      auth: authReducer,
      users: userReducer,
    }),
    EffectsModule.forRoot([
      AuthEffect,
      UserEffect,

    ])
  ],
  exports: [RouterModule, StoreModule, EffectsModule],
})
export class AppRoutingModule {}
