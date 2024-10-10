import { Component, Input } from '@angular/core';
import { Person } from 'src/app/types/person.type';

@Component({
  selector: 'app-info-person',
  templateUrl: './info-person.component.html',
  styleUrls: ['./info-person.component.css'],
})
export class InfoPersonComponent {
  @Input() person: Person | null = null;

  constructor() {}
}
