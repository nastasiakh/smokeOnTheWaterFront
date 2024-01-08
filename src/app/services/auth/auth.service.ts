import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignUpDto} from "../../dtos/signUp.dto";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor( private http: HttpClient) { }

  login(email: string, password: string): Observable<{ token: string, user: any }> {
    const url = `${this.apiUrl}/auth/login`;
    return this.http.post<{ token: string, user: any }>(url, {email, password});
  }

  signUp(data: SignUpDto): Observable<SignUpDto> {
    const url = `${this.apiUrl}/auth/sign-up`;
    return this.http.post<SignUpDto>(url, data);
  }
}
