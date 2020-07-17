import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactsComponent implements OnInit {
  @HostBinding("class.app-contacts") true;

  constructor() { }

  ngOnInit(): void {
  }

}
