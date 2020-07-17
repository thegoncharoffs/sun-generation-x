import { Component, EventEmitter, HostBinding, ViewEncapsulation, Output, Input } from '@angular/core';

@Component({
    selector: 'app-search-field',
    templateUrl: './search-field.component.html',
    styleUrls: ['./search-field.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SearchFieldComponent {
    @HostBinding("class.app-search-field") true;

    @Input()
    placeholder: string = '';

    @Output()
    valueChange: EventEmitter<string> = new EventEmitter<string>();

    _onInput(event: Event) {
        this.valueChange.emit((event.target as HTMLInputElement).value);
    }
}
