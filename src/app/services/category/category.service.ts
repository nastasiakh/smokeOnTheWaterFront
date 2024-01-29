import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryModel} from "../../models/CategoryModel";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl;
  constructor( private http: HttpClient) { }

  createCategory(newCategory: CategoryModel ): Observable<{ category: CategoryModel }> {
    const url = `${this.apiUrl}/categories/`;
    return this.http.post<{ category: CategoryModel }>(url, newCategory);
  };

  updateCategory(categoryId: number, updatedCategory: any): Observable<{ category: CategoryModel }> {
    const url = `${this.apiUrl}/categories/${categoryId}`;
    return this.http.put<{category: CategoryModel}>(url, updatedCategory)
  }

  getCategories(): Observable<CategoryModel[]> {
    const url = `${this.apiUrl}/categories/`;
    return this.http.get<CategoryModel[]>(url);
  }

  getCategoryById(categoryId: number): Observable<CategoryModel> {
    const url = `${this.apiUrl}/categories/${categoryId}`;
    return this.http.get<CategoryModel>(url);
  }

  deleteCategory(categoryId: number): Observable<{ category: CategoryModel }> {
    const url = `${this.apiUrl}/categories/${categoryId}`;
    return this.http.delete<{category: CategoryModel}>(url);
  }


}
