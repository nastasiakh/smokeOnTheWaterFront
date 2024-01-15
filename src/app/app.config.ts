import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {authReducer} from "./store/reducers/auth.reducer";
import {AuthEffect} from "./store/effects/auth.effect";
import {provideHttpClient} from "@angular/common/http";
import {UserEffect} from "./store/effects/user.effect";
import {userReducer} from "./store/reducers/user.reducer";
import {RoleEffect} from "./store/effects/role.effect";
import {roleReducer} from "./store/reducers/role.reducer";
import { provideStoreDevtools } from '@ngrx/store-devtools';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore({
        auth: authReducer,
        users: userReducer,
        roles: roleReducer,
    }),
    provideEffects([
        AuthEffect,
        UserEffect,
        RoleEffect,
    ]),
    provideHttpClient(),
    provideAnimations(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
