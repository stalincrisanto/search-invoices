import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchService } from 'src/app/services/search.service';
import { Invoice } from 'src/app/types/invoice.type';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() invoices: Invoice[] | null = [];
  readonly dialog = inject(MatDialog);

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

  openModal(routeFile: string) {
    this.searchService.viewPDF(routeFile).subscribe({
      next: (fileUrl: string) => {
        this.dialog.open(ModalComponent, {
          width: '80%',
          data: fileUrl,
        });
      },
      error: (err) => {
        console.error('Error al cargar el visor de PDF', err);
      },
    });
    // this.dialog.open(ModalComponent, {
    //   width: '80%',
    //   data: 'https://main-graphql-media-mediabucket-bucketd7feb781-12j7qtewbafu9.s3.eu-west-1.amazonaws.com/Presurizados%20con%20c%C3%A1mara.pdf',
    // });
  }
}
