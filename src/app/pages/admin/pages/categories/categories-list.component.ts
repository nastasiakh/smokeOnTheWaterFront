import { Component } from '@angular/core';
import {ButtonComponent} from "../../../../components/shared/button/button.component";
import {EntitiesListComponent} from "../../../../components/shared/entities-list/entities-list.component";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {selectCategories} from "../../../../store/selectors/selectors";
import {CategoryModel} from "../../../../models/CategoryModel";
import {loadCategoriesActions} from "../../../../store/actions/category.action";
import {ProvidePermissionCheck} from "../../../../utils/providePermissionCheck";

@Component({
  selector: 'app-categories',
  standalone: true,
    imports: [
        ButtonComponent,
        EntitiesListComponent,
        NgIf,
        RouterLink
    ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent {
  displayedColumns: string[] = ['id', 'title', 'description', 'parent'];
  categoryData: CategoryModel[] = [];
  dataSource: any[] = [];

  constructor(private store: Store, protected permissionCheck: ProvidePermissionCheck) {
  }

  ngOnInit(): void {
    this.loadCategoryData();

  }

  loadCategoryData(): void {
    this.store.dispatch(loadCategoriesActions.loadCategories());
    this.store.pipe(select(selectCategories)).subscribe(categories => {
      if (categories) {
        this.categoryData = categories;
        this.dataSource = this.categoryData.map(category => {
          return {
            id: category.id,
            title: category.title,
            description: category.description,
            parent: categories.filter(cat => category.parentId == cat.id)[0]?.title
          }
        })
      }
    })
  }
}
