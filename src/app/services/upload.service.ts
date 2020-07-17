import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { BASE_URL } from '../app.config';

@Injectable()
export class UploadService {

    constructor(private http: HttpClient) {
    }

    uploadFile(files: File[], directoryName: string): Observable<any> {
        const body = new FormData();
        for (let i = 0; i < files.length; i++) {
            body.append('file' + i, files[i])
        }
        body.append('directoryName', directoryName);

        return this.http.post(BASE_URL + 'upload', body);
    }

    deleteFile(fileName: string, directoryName: string): Observable<any> {
        const params = {
            fileName,
            directoryName,
        };

        return this.http.delete(BASE_URL + 'delete', {params});
    }

    downloadFile(fileName: string, directoryName: string): Observable<any> {
        const params = {
            fileName,
            directoryName,
        };

        return this.http.get(BASE_URL + 'download', {params});
    }
}
