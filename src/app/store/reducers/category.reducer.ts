import {createReducer, on} from "@ngrx/store";
import * as CategoryActions from '../actions/category.action';
import {CategoryModel} from "../../models/CategoryModel";


export interface CategoryState {
  categories?: CategoryModel[];
  category?: CategoryModel;
  categoryModified?: boolean;
  categoryRemoved?: boolean;
  loading?: boolean;
  error?: string | null;
}

export const initialCategoryState: CategoryState = {};

export const categoryReducer = createReducer(
  initialCategoryState,
  on(CategoryActions.createCategoryActions.createCategory, (state, { category }) => ({ ...state, loading: true })),
  on(CategoryActions.createCategoryActions.createCategorySuccess, (state) => ({
    ...state,
    categoryModified: true,
    loading: false,
    error: null
  })),
  on(CategoryActions.createCategoryActions.createCategoryFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(CategoryActions.updateCategoryActions.updateCategory, (state, { categoryId, updatedCategory }) => ({ ...state, loading: true })),
  on(CategoryActions.updateCategoryActions.updateCategorySuccess, (state, { category }) => ({
    ...state,
    categoryModified: true,
    loading: false,
    error: null
  })),
  on(CategoryActions.updateCategoryActions.updateCategoryFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(CategoryActions.deleteCategoryActions.deleteCategory, (state, { categoryId }) => ({ ...state, loading: true })),
  on(CategoryActions.deleteCategoryActions.deleteCategorySuccess, (state, { category }) => ({
    ...state,
    category: category,
    categoryRemoved: true,
    loading: false,
    error: null
  })),
  on(CategoryActions.deleteCategoryActions.deleteCategoryFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(CategoryActions.loadCategoryByIdActions.loadCategoryById, (state, { categoryId }) => ({ ...state, loading: true })),
  on(CategoryActions.loadCategoryByIdActions.loadCategoryByIdSuccess, (state, { category }) => ({
    ...state,
    category: category,
    loading: false,
    error: null,
    categoryModified: false,
  })),
  on(CategoryActions.loadCategoryByIdActions.loadCategoryByIdFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(CategoryActions.loadCategoriesActions.loadCategories, (state) => ({ ...state, loading: true })),
  on(CategoryActions.loadCategoriesActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories: categories,
    categoryModified: false,
    error: null,
  })),
  on(CategoryActions.loadCategoriesActions.loadCategoriesFailure, (state, { error }) => ({ ...state, loading: false, error: error })),
)
