import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserState} from "../reducers/user.reducer";
import {RoleState} from "../reducers/role.reducer";
import {AuthState} from "../reducers/auth.reducer";
import {PermissionState} from "../reducers/permission.reducer";
import {ProductState} from "../reducers/product.reducer";
import {CategoryState} from "../reducers/category.reducer";
import {OrderState} from "../reducers/order.reducer";


export interface AppState{
  users: UserState;
  roles: RoleState;
  auth: AuthState;
  permissions: PermissionState;
  products: ProductState;
  categories: CategoryState;
  orders: OrderState;
}

export const selectAuthState = createFeatureSelector<AppState["auth"]>("auth");
export const selectUserState = createFeatureSelector<AppState["users"]>("users");
export const selectRoleState = createFeatureSelector<AppState["roles"]>("roles");
export const selectPermissionState = createFeatureSelector<AppState["permissions"]>("permissions");
export const selectProductState = createFeatureSelector<AppState["products"]>("products");
export const selectCategoryState = createFeatureSelector<AppState["categories"]>("categories");
export const selectOrderState = createFeatureSelector<AppState["orders"]>("orders");


export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);
export const selectCurrentUser = createSelector(
  selectUserState,
  (state) => state.user
);
export const selectCurrentUserRoles = createSelector(
  selectAuthState,
  (state) => state.user?.roles
);

export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);
export const selectUser = createSelector(
  selectUserState,
  (state) => state.user || null
);

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products
);
export const selectProduct = createSelector(
  selectProductState,
  (state) => state.product || null
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

export const selectOrders = createSelector(
  selectOrderState,
  (state) => state.orders
)
export const selectOrder = createSelector(
  selectOrderState,
  (state) => state.order || null
)
