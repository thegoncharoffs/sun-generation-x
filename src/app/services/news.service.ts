import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BASE_URL } from "../app.config";
import { News } from '../models/news.model';

@Injectable()
export class NewsService {
    constructor(private http: HttpClient) { }

    loadNews(): Observable<any> {
        return this.http.get(BASE_URL + "news");
    }

    postNews(news: News): Observable<any> {
        return this.http.post(BASE_URL + "news", news);
    }

    deleteNews(id: string): Observable<any> {
        const params = {
            id,
        };

        return this.http.delete(BASE_URL + "news", { params });
    }
}
