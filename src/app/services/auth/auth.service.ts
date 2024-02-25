import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {decodeJwt} from "jose";
import {UserModel} from "../../models/UserModel";
import {SignUpDto} from "../../dtos/signUp.dto";
import {environment} from "../../../environments/environment";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  public currentUser$ = new BehaviorSubject<UserModel | null | undefined>(undefined);

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    this.initializeCurrentUser();
  }

  login(email: string, password: string): Observable<{ token: string, user: UserModel }> {
    this.logout();
    const url = `${this.apiUrl}/auth/login`;
    return this.http.post<{ token: string, refreshToken: string, user: UserModel }>(url, { email, password }).pipe(
      map(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
        this.currentUser$.next(response.user);
        return response;
      }),
      catchError(error => {
        return throwError(() => 'Authentication failed');
      })
    );
  }

  signUp(data: SignUpDto): Observable<{ token: string}> {
    const url = `${this.apiUrl}/auth/sign-up`;
    return this.http.post<{ token: string }>(url, data).pipe(
      tap(response => this.handleLogin(response.token)),
      catchError(error => throwError(() => 'User creating failed'))
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUser$.next(null);
    this.router.navigate(['/auth/login']);
  }

  get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      return true;
    }
    const decodedToken: any = decodeJwt(token);
    if (!decodedToken || typeof decodedToken === 'string') {
      return true;
    }
    const expirationTime = decodedToken.exp ? decodedToken.exp * 1000 : 0;
    return Date.now() >= expirationTime;
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      return throwError(() => 'Refresh token not found');
    }
    const url = `${this.apiUrl}/auth/refresh`;
    const headers = new HttpHeaders({ Authorization: `Bearer ${refreshToken}` });
    return this.http.post<{ token: string }>(url, {}, { headers }).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
      }),
      catchError(error => {
        this.logout();
        return throwError(() => 'Refresh token failed');
      })
    );
  }
  private initializeCurrentUser(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      const decodedToken: { email: string, id: number, exp: number } = decodeJwt(token);
      this.userService.getUserById(decodedToken.id).subscribe(user =>
        this.updateCurrentUser(user)
      );
    }
  }

  private updateCurrentUser(user: UserModel | null | undefined): void {
    this.currentUser$.next(user);
  }

  private handleLogin(token: string, user?: any) {
    localStorage.setItem(this.TOKEN_KEY, token);
    if (user) {
      this.currentUser$.next(user);
    }
  }
}
