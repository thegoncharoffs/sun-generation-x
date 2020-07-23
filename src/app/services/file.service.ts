import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BASE_URL } from "../app.config";

@Injectable()
export class FileService {
    constructor(private http: HttpClient) { }

    loadFiles(): Observable<any> {
        return this.http.get(BASE_URL + "files/all");
    }

    uploadFiles(files: File[], directoryName: string): Observable<any> {
        const body = new FormData();
        for (let i = 0; i < files.length; i++) {
            body.append("file" + i, files[i]);
        }
        body.append("directoryName", directoryName);

        return this.http.post(BASE_URL + "files", body);
    }

    deleteFile(fileName: string, directoryName: string): Observable<any> {
        const params = {
            fileName,
            directoryName,
        };

        return this.http.delete(BASE_URL + "files", { params });
    }

    downloadFile(fileName: string, directoryName: string): Observable<any> {
        const params = {
            fileName,
            directoryName,
        };

        return this.http.get(BASE_URL + "files", { params });
    }
}
