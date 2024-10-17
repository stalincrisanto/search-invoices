import { Component, Input, SimpleChanges } from '@angular/core';
import { Invoice } from '../../../../shared/models/invoice.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  @Input() invoices: Invoice[] | null = null;

  columns: string[] = ['chsDataDat', 'rutaXmlRecibido', 'rutaPdfGenerado'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['invoices'] && this.invoices) {
      console.log('Datos actualizados en result:', this.invoices);
    }
  }
}
