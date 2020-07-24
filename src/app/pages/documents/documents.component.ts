import { ChangeDetectorRef, Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { DocumentGroup } from 'src/app/models/documents-group.model';
import { BASE_URL } from "../../app.config";
import { Router } from "@angular/router";
import { FileService } from 'src/app/services/file.service';

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DocumentsComponent implements OnInit {
    @HostBinding("class.app-documents") true;

    _searchValue: string = '';
    _documentGroups: DocumentGroup[];
    _selectedGroupIndex: number = 0;
    _error: string;
    _loading: boolean = true;
    _logged: boolean = false;

    constructor(
        private fileService: FileService,
        private authService: AuthService,
        private cdr: ChangeDetectorRef,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.fileService.loadFiles().subscribe((config => {
            this._loading = false;
            this._documentGroups = config;
            this.cdr.detectChanges();
        }));

        this._logged = this.authService.isLoggedIn();
    }

    _onUploadFileChange(event) {
        this._loading = true;

        this.fileService.uploadFiles(event.target.files, this._documentGroups[this._selectedGroupIndex].directoryName).subscribe(
            (config) => {
                this._documentGroups = config;
                this._loading = false;
                this.cdr.detectChanges();
            },
            (err) => {
                this._error = err;
                this._loading = false;
                this.cdr.detectChanges();
            },
        );
    }

    _onDownloadFileClick(fileName: string) {
        const link = document.createElement('a');
        link.href = BASE_URL + `download?fileName=${fileName}&directoryName=${this._documentGroups[this._selectedGroupIndex].directoryName}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    _onDeleteFileClick(fileName: string) {
        this._loading = true;

        this.fileService.deleteFile(fileName, this._documentGroups[this._selectedGroupIndex].directoryName).subscribe(
            (config) => {
                this._documentGroups = config;
                this._loading = false;
                this.cdr.detectChanges();
            },
            (err) => {
                this._error = err;
                this._loading = false;
                this.cdr.detectChanges();
            },
        );
    }

    _onLogoutButtonClick() {
        this.authService.logout();
        this._logged = false;
    }
}
