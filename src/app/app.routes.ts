import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./pages/home/home.component";
import {StoreModule} from "@ngrx/store";
import {authReducer} from "./store/reducers/auth.reducer";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffect} from "./store/effects/auth.effect";

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/sign-up', component: SignUpComponent },

  { path: '', component: HomeComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    StoreModule.forRoot({
      auth: authReducer,
    }),
    EffectsModule.forRoot([
      AuthEffect,
    ])
  ],
  exports: [RouterModule, StoreModule, EffectsModule],
})
export class AppRoutingModule {}
