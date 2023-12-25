import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {authReducer} from "./store/reducers/auth.reducer";
import {AuthEffect} from "./store/effects/auth.effect";
import {provideHttpClient} from "@angular/common/http";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore({
      auth: authReducer,
    }),
    provideEffects([
      AuthEffect,
    ]),
    provideHttpClient()
  ]
};
