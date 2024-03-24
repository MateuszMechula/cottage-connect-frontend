import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {AuthResponse} from "../interfaces/auth-response";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../interfaces/login-request";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private tokenKey = 'token';

  constructor(private http: HttpClient) {
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}auth/authenticate`, data).pipe(
      map((response) => {
        if (response && response.access_token) {
          localStorage.setItem(this.tokenKey, response.access_token)
        }
        return response;
      })
    )
  }
}
