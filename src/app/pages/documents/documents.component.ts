import { ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { DocumentGroup } from 'src/app/models/documents-group.model';
import { BASE_URL } from "../../app.config";
import { FileService } from 'src/app/services/file.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DocumentsComponent implements OnInit, OnDestroy {
    @HostBinding("class.app-documents") true;

    _searchValue: string = '';
    _documentGroups: DocumentGroup[];
    _selectedGroupIndex: number = 0;
    _error: string;
    _loading: boolean = true;
    _logged: boolean = false;

    private destroy$: Subject<boolean> = new Subject();

    constructor(
        private fileService: FileService,
        private authService: AuthService,
        private cdr: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this._loading = true;

        this.fileService.loadFiles().pipe(
            takeUntil(this.destroy$),
        ).subscribe(
            documentGroups => {
                this._documentGroups = documentGroups;
                this._loading = false;
                this.cdr.detectChanges();
            },
            err => {
                this._error = err;
                this._loading = false;
                this.cdr.detectChanges();
            },
        );

        this._logged = this.authService.isLoggedIn();
    }

    ngOnDestroy(): void {
        this.destroy$.next()
        this.destroy$.complete();
    }

    _onUploadFileChange(event) {
        this._loading = true;

        this.fileService.uploadFiles(
            event.target.files,
            this._documentGroups[this._selectedGroupIndex]._id
        ).pipe(
            takeUntil(this.destroy$),
        ).subscribe(
            documentGroups => {
                this._documentGroups = documentGroups;
                this._loading = false;
                this.cdr.detectChanges();
            },
            err => {
                this._error = err;
                this._loading = false;
                this.cdr.detectChanges();
            },
        );
    }

    _onDownloadFileClick(fileId: string) {
        const link = document.createElement('a');
        link.href = BASE_URL + `files?fileId=${fileId}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    _onDeleteFileClick(fileId: string) {
        this._loading = true;

        this.fileService.deleteFile(
            this._documentGroups[this._selectedGroupIndex]._id,
            fileId
        ).pipe(
            takeUntil(this.destroy$),
        ).subscribe(
            documentGroups => {
                this._documentGroups = documentGroups;
                this._loading = false;
                this.cdr.detectChanges();
            },
            err => {
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
