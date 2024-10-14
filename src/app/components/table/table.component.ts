import { Component, Input } from '@angular/core';
import { Invoice } from 'src/app/types/invoice.type';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() invoices: Invoice[] = [];

  protected displayedColumns: string[] = [
    'chsDataDat',
    'rutaXmlEnviado',
    'rutaXmlRecibido',
    'rutaXmlComprobanteRecibido',
    'rutaPdfGenerado',
  ];

  constructor() {}
}
