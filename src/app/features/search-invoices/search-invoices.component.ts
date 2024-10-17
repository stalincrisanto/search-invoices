import { Component } from '@angular/core';
import { Invoice } from '../../shared/models/invoice.model';

@Component({
  selector: 'app-search-invoices',
  templateUrl: './search-invoices.component.html',
  styleUrls: ['./search-invoices.component.css']
})
export class SearchInvoicesComponent {
  invoices: Invoice[] | null = null;

  onSearchResults(invoices: Invoice[]) {
    this.invoices = invoices;
    console.log('Facturas recibidas en el componente padre:', invoices);
  }
}
