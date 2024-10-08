import { Component, Input } from '@angular/core';
import { Invoice, SearchParams } from 'src/app/types/person.type';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() invoices: Invoice[] = [];

  protected displayedColumns: string[] = ['id', 'total', 'date'];

  constructor() {}
}
