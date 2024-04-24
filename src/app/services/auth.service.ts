import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {AuthResponse} from "../interfaces/auth-response";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../interfaces/login-request";
import {jwtDecode} from "jwt-decode";
import {RegisterRequest} from "../interfaces/register-request";
import {UserDetail} from "../interfaces/user-detail";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  role: string[] | undefined;
  private tokenKey = 'token';

  constructor(private http: HttpClient) {
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}auth/authenticate`, data).pipe(
      map((response) => {
        if (response) {
          localStorage.setItem(this.tokenKey, response.access_token)
          const userRole = this.getUserRole();
          this.role = userRole ? userRole : [];
        }
        return response;
      })
    )
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}auth/register`, data);
  }

  getDetail(): Observable<UserDetail> {
    return this.http.get<UserDetail>(`${this.apiUrl}users/account/details`);
  }


  getUserDetail = () => {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      email: decodedToken.sub
    };
    return userDetail;

  }

  isLoggedIn = (): boolean => {
    const token = this.getToken;
    if (!token) {
      return false;
    }
    return !this.isTokenExpired();
  }

  private isTokenExpired() {
    const token = this.getToken();
    if (!token) {
      return true;
    }
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if (isTokenExpired) {
      this.logout();
    }
    return isTokenExpired;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  public getToken = (): string | null => localStorage.getItem(this.tokenKey) || '';

  public getUserRole = (): string[] | null => {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodedToken: any = jwtDecode(token);
    if (decodedToken.role && decodedToken.role.length) {
      let authority = decodedToken.role;
      return authority;
    }
    return [];
  }
}
