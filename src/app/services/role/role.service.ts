import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RoleModel} from "../../models/RoleModel";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
private apiUrl = environment.apiUrl;
  constructor( private http: HttpClient) { }

  createRole(role: RoleModel): Observable<{role: RoleModel}> {
    const url = `${this.apiUrl}/roles/`;
    return this.http.post<{role: RoleModel}>(url, role);
  }

  getRoles(): Observable<RoleModel[]> {
    const url = `${this.apiUrl}/roles/`;
    return this.http.get<RoleModel[]>(url);
  }

  getRoleById(roleId: number): Observable<RoleModel> {
    const url = `${this.apiUrl}/roles/${roleId}`;
    return this.http.get<RoleModel>(url);
  }

  updateRole(roleId: number, updatedRole: RoleModel): Observable<{role: RoleModel }> {
    const url = `${this.apiUrl}/roles/${roleId}`;
    return this.http.put<{ role: RoleModel }>(url, updatedRole)
  }

  deleteRole(roleId: number): Observable<RoleModel> {
    const url = `${this.apiUrl}/roles/${roleId}`;
    return this.http.delete<RoleModel>(url)
  }
}
