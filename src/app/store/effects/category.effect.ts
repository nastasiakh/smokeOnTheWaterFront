import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CategoryService} from "../../services/category/category.service";
import * as CategoryActions from "../actions/category.action";
import {catchError, map, mergeMap, of, switchMap} from "rxjs";

@Injectable()
export class CategoryEffect {
  createCategory$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.createCategoryActions.createCategory),
    mergeMap(category => {
      return this.categoryService.createCategory(category.category)
        .pipe(
          map(() => CategoryActions.createCategoryActions.createCategorySuccess()),
          catchError(error => of(CategoryActions.createCategoryActions.createCategoryFailure(error)))
        )
      }
    )
  ));

  updateCategory$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.updateCategoryActions.updateCategory),
    mergeMap(action => this.categoryService.updateCategory(action.categoryId, action.updatedCategory)
      .pipe(
        map(category => CategoryActions.updateCategoryActions.updateCategorySuccess(category)),
        catchError(error => of(CategoryActions.updateCategoryActions.updateCategoryFailure(error)))
      ))
  ));

  loadCategories$ = createEffect( () => this.actions$.pipe(
    ofType(CategoryActions.loadCategoriesActions.loadCategories),
    switchMap(() => this.categoryService.getCategories().pipe(
      map(categories => CategoryActions.loadCategoriesActions.loadCategoriesSuccess({ categories })),
      catchError(error => of(CategoryActions.loadCategoriesActions.loadCategoriesFailure(error)))
    ))
  ));

  loadCategoryById$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.loadCategoryByIdActions.loadCategoryById),
    mergeMap(action => this.categoryService.getCategoryById(action.categoryId).pipe(
      map( category => CategoryActions.loadCategoryByIdActions.loadCategoryByIdSuccess({ category })),
      catchError(error => of(CategoryActions.loadCategoryByIdActions.loadCategoryByIdFailure(error)))
    ))
  ));

  deleteCategory$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.deleteCategoryActions.deleteCategory),
    mergeMap(action => this.categoryService.deleteCategory(action.categoryId).pipe(
      map(category => CategoryActions.deleteCategoryActions.deleteCategorySuccess(category)),
      catchError(error => of(CategoryActions.deleteCategoryActions.deleteCategoryFailure(error)))
    ))
  ))

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}

}
