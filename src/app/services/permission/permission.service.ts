import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PermissionModel} from "../../models/PermissionModel";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getPermissions(): Observable<PermissionModel[]> {
    const url = `${this.apiUrl}/permissions/`;
    return this.http.get<PermissionModel[]>(url);
  }

}
