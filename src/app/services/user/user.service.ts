import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../../models/UserModel";

@Injectable({
  providedIn: 'root'
})
export class UserService {
private apiUrl = environment.apiUrl;
  constructor( private http: HttpClient) { }

  createUser(newUser: any): Observable<{ user: any }> {
    const url = `${this.apiUrl}/users/`;
    return this.http.post<{ user: any }>(url, newUser);
  };

  updateUser(userId: number, updatedUser: any): Observable<{ user: any }> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.put<{user: any}>(url, updatedUser)
  }

  getUsers(): Observable<UserModel[]> {
    const url = `${this.apiUrl}/users/`;
    return this.http.get<UserModel[]>(url);
  }

  getUserById(userId: number): Observable<{ user: any }> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get<{user: any}>(url);
  }

  deleteUser(userId: number): Observable<{ user: any }> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.delete<{user: any}>(url);
  }

}
