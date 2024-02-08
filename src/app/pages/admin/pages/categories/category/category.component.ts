import { Component } from '@angular/core';
import {catchError, map, Observable, of, switchMap, take} from "rxjs";
import {CategoryModel} from "../../../../../models/CategoryModel";
import {select, Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  createCategoryActions, deleteCategoryActions,
  loadCategoryByIdActions,
  updateCategoryActions
} from "../../../../../store/actions/category.action";
import {selectCategories, selectCategory, selectCategoryState} from "../../../../../store/selectors/selectors";
import {loadCategoriesActions} from "../../../../../store/actions/category.action";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ButtonComponent} from "../../../../../components/shared/button/button.component";
import {InputComponent} from "../../../../../components/shared/input/input.component";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonComponent,
    InputComponent,
    MatError,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    NgIf,
    FormsModule,
    NgForOf
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  values: { [key: string]: string } = {};
  currentCategoryId: number | undefined;
  category$: Observable<CategoryModel | null> = of({} as CategoryModel);
  chosenParentsCategories: (number | undefined)[] | undefined = [];
  categories$: Observable<CategoryModel[] | undefined> = of([] as CategoryModel[]);
  isCreatingCategory = true;

  constructor(private store: Store<{category: CategoryModel}>, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.categories$ = this.loadCategories();
    this.route.paramMap.pipe(
      switchMap(async (params) => {
        const categoryId = Number(params.get("categoryId"));
        if(categoryId) {
          this.isCreatingCategory = false;
          this.currentCategoryId = categoryId;
          this.store.dispatch(loadCategoryByIdActions.loadCategoryById({categoryId: categoryId}));
          return this.store.pipe(select(selectCategory));
        }
        return of({} as CategoryModel);
      }),
      take(1)
    ).subscribe(category => {
      this.category$ = category;
      category.pipe(
        switchMap(parentCat => {
          return this.categories$.pipe(
            map(cats => cats?.filter(cat => cat.id === parentCat?.parentId))
          );
        })).subscribe(chosenParents => {
        this.chosenParentsCategories = chosenParents?.map(cat => cat.id);
      });
    });

  }
  onInputChange(inputType: string, value: string ): void {
    this.values[inputType] = value;
  }
  private navigateToCategoryList(): void {
    this.router.navigate(['/admin/categorys']);
  }

  loadCategories(): Observable<CategoryModel[]|undefined>{
    this.store.dispatch(loadCategoriesActions.loadCategories());
    return this.store.pipe(select(selectCategories))
  }
  saveCategory(category: CategoryModel) {
    let updatedCategories: CategoryModel [] | undefined = [];

    this.categories$.pipe(take(1)).subscribe(categories => {
      this.chosenParentsCategories?.forEach(categoryId => {
        const category = categories?.find(c => c.id === categoryId);
        if (category) {
          updatedCategories?.push(category);
        }
      });
    })

    const updatedCategory = {...category, categories: updatedCategories || undefined };

    if (!this.isCreatingCategory && category.id) {
      this.store.dispatch(updateCategoryActions.updateCategory({categoryId: category.id, updatedCategory: updatedCategory}));
    } else {
      this.store.dispatch(createCategoryActions.createCategory({category: updatedCategory}));
    }
    this.store.pipe(select(selectCategoryState), catchError(error => {
      return of(error)
    })).subscribe(categoryState => {
      if(categoryState?.categoryModified) {
        this.showSuccessSnackBar("Changes saved")
        this.navigateToCategoryList();
      } else if (categoryState?.error){
        this.showErrorSnackBar("Changes weren't saved")
        console.error("Category not modified: ", categoryState?.error)
      }
    })
  }

  removeCategory(categoryId: number) {
    this.store.dispatch(deleteCategoryActions.deleteCategory({categoryId}));
    this.store.pipe(select(selectCategoryState)).subscribe(categoryState => {
      if (categoryState.categoryRemoved) {
        this.navigateToCategoryList();
        this.showSuccessSnackBar('Category successfully deleted');
      } else {
        this.showSuccessSnackBar('Category deleting failed');
      }
    })
  }

  private showSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: 'success-snackbar' });
  }

  private showErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: 'error-snackbar' });
  }

}
