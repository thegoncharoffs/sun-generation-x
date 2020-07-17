import { Injectable } from '@angular/core';
import { TokenStorageService } from "./token-storage.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { BASE_URL } from "../app.config";
import { Credentials } from '../models/credentials.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
      private http: HttpClient,
      private tokenStorage: TokenStorageService,
  ) { }

  isLoggedIn(): boolean {
    return !!this.tokenStorage.getToken();
  }

  logout(): void {
    this.tokenStorage.loguot()
  }

  login(credentials: Credentials): Observable<any> {
    return this.http.post(BASE_URL + 'login', {
      login: credentials.login,
      password: credentials.password
    }, httpOptions);
  }
}
