import { createActionGroup, emptyProps, props} from "@ngrx/store";
import {CategoryModel} from "../../models/CategoryModel";


export const createCategoryActions = createActionGroup({
  source: "category",
  events: {
    "Create Category": props<{ category: CategoryModel }>(),
    "Create Category Success": emptyProps(),
    "Create Category Failure": props<{ error: string }>()
  }
});

export const updateCategoryActions = createActionGroup({
  source: "category",
  events: {
    "Update Category": props<{ categoryId: number, updatedCategory: CategoryModel }>(),
    "Update Category Success": props<{ category: CategoryModel }>(),
    "Update Category Failure": props<{ error: string }>()
  }
});

export const deleteCategoryActions = createActionGroup({
  source: "category",
  events: {
    "Delete Category": props<{ categoryId: number }>(),
    "Delete Category Success": props<{ category: CategoryModel }>(),
    "Delete Category Failure": props<{ error: string }>()
  }
});

export const loadCategoryByIdActions = createActionGroup({
  source: "category",
  events: {
    "Load Category By Id": props<{ categoryId: number }>(),
    "Load Category By Id Success": props<{ category: CategoryModel }>(),
    "Load Category By Id Failure": props<{ error: string }>()
  }
});

export const loadCategoriesActions = createActionGroup({
  source: "category",
  events: {
    "Load Categories": emptyProps(),
    "Load Categories Success": props<{ categories: CategoryModel[] }>(),
    "Load Categories Failure": props<{ error: string }>()
  }
});
