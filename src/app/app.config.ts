import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {authReducer} from "./store/reducers/auth.reducer";
import {AuthEffect} from "./store/effects/auth.effect";
import {provideHttpClient} from "@angular/common/http";
import {UserEffect} from "./store/effects/user.effect";
import {userReducer} from "./store/reducers/user.reducer";
import {RoleEffect} from "./store/effects/role.effect";
import {roleReducer} from "./store/reducers/role.reducer";
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {permissionReducer} from "./store/reducers/permission.reducer";
import {PermissionEffect} from "./store/effects/permission.effect";
import {productReducer} from "./store/reducers/product.reducer";
import {ProductEffect} from "./store/effects/product.effect";
import {CategoryEffect} from "./store/effects/category.effect";
import {categoryReducer} from "./store/reducers/category.reducer";
import {OrderEffect} from "./store/effects/order.effect";
import {orderReducer} from "./store/reducers/order.reducer";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore({
      auth: authReducer,
      users: userReducer,
      roles: roleReducer,
      permissions: permissionReducer,
      products: productReducer,
      categories: categoryReducer,
      orders: orderReducer,
    }),
    provideEffects([
      AuthEffect,
      UserEffect,
      RoleEffect,
      PermissionEffect,
      ProductEffect,
      CategoryEffect,
      OrderEffect,
    ]),
    provideHttpClient(),
    provideAnimations(),
    provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()})
  ]
};
