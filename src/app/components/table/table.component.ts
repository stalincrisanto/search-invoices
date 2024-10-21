import { Component, Input } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Invoice } from 'src/app/types/invoice.type';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() invoices: Invoice[] | null = [];

  protected displayedColumns: string[] = [
    'chs_data_dat',
    'ruta_pdf_generado',
    'ruta_xml_comprobante_recibido',
  ];

  constructor(private searchService: SearchService) {}

  downloadPDF(routePdf: string) {
    const finalUrl = routePdf.replace(/\//g, '\\').replace(/^\\C:/, 'C:');
    this.searchService.downloadPDF(finalUrl);
  }
}
