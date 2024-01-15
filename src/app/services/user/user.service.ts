import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../../models/UserModel";
import {SignUpDto} from "../../dtos/signUp.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
private apiUrl = environment.apiUrl;
  constructor( private http: HttpClient) { }

  createUser(newUser: UserModel ): Observable<{ user: UserModel }> {
    const url = `${this.apiUrl}/users/`;
    return this.http.post<{ user: UserModel }>(url, newUser);
  };

  updateUser(userId: number, updatedUser: any): Observable<{ user: UserModel }> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.put<{user: UserModel}>(url, updatedUser)
  }

  getUsers(): Observable<UserModel[]> {
    const url = `${this.apiUrl}/users/`;
    return this.http.get<UserModel[]>(url);
  }

  getUserById(userId: number): Observable<UserModel> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get<UserModel>(url);
  }

  deleteUser(userId: number): Observable<{ user: UserModel }> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.delete<{user: UserModel}>(url);
  }

}
