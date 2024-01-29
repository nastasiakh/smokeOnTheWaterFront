import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserState} from "../reducers/user.reducer";
import {RoleState} from "../reducers/role.reducer";
import {AuthState} from "../reducers/auth.reducer";
import {PermissionState} from "../reducers/permission.reducer";
import {ProductState} from "../reducers/product.reducer";
import {CategoryState} from "../reducers/category.reducer";


export interface AppState{
  users: UserState;
  roles: RoleState;
  auth: AuthState;
  permissions: PermissionState;
  products: ProductState;
}

export const selectUserState = createFeatureSelector<UserState>("users");
export const selectRoleState = createFeatureSelector<RoleState>("roles");
export const selectPermissionState = createFeatureSelector<PermissionState>("permissions");
export const selectProductState = createFeatureSelector<ProductState>("products");
export const selectCategoryState = createFeatureSelector<CategoryState>("categories");
export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);
export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products
);
export const selectProduct = createSelector(
  selectProductState,
  (state) => state.product || null
);

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user || null
);

export const selectRoles = createSelector(
  selectRoleState,
  (state) => state.roles
);
export const selectRole = createSelector(
  selectRoleState,
  (state) => state.role || null
);

export const selectPermissions = createSelector(
  selectPermissionState,
  (state) => state.permissions || null
);

export const selectCategories = createSelector(
  selectCategoryState,
  (state) => state.categories
);
export const selectCategory = createSelector(
  selectCategoryState,
  (state) => state.category || null
);
