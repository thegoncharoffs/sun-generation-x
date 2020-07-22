import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BASE_URL } from "../app.config";

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {}

  loadConfig(): Observable<any> {
    return this.http.get(BASE_URL + "files");
  }
}
