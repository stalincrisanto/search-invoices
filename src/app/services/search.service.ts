import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError, map } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Invoice, SearchParams } from '../types/invoice.type';
import * as dayjs from 'dayjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getInvoicesOfPerson({
    cardId,
    dateStart,
    dateEnd,
  }: SearchParams): Observable<Invoice[] | null> {
    console.log({ dateStart, dateEnd });
    const formattedDateStart = dateStart
      ? dayjs(dateStart).startOf('day').format('YYYY-MM-DD HH:mm:ss')
      : null;
    const formattedDateEnd = dateEnd
      ? dayjs(dateEnd).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      : null;

    const queryParams = new URLSearchParams();
    queryParams.set('identificacion', cardId);

    if (formattedDateStart) {
      queryParams.set('fecha_inicio', formattedDateStart);
    }

    if (formattedDateEnd) {
      queryParams.set('fecha_fin', formattedDateEnd);
    }

    const url = `${this.apiUrl}?${queryParams.toString()}`;

    return this.http.get<Invoice[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al buscar el cliente', error);
        return of(null);
      }),
      map((invoices) => (invoices && invoices.length > 0 ? invoices : null))
    );
  }

  //TODO: move to other folder
  // test only with url
  downloadPDF(routePdf: string) {
    const routeDownloadPdf = `${this.apiUrl}download?file=${routePdf}`;

    const harcodeRoute =
      'http://10.108.210.78:5000/api/bills/download?file=C:\\Users\\eduardo.jaramillo\\Documents\\dev\\Pruebas SIR\\0112202301176816465000120010030000009410000094118.pdf';

    console.log({ routePdf, routeDownloadPdf });

    this.http.get(harcodeRoute, { responseType: 'blob' }).subscribe({
      next: (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = routePdf;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error descargando el archivo', err);
      },
      complete: () => {
        console.log('Descarga completa');
      },
    });
  }

  viewPDF(routePdf: string): Observable<string> {
    const routeViewPdf = `${this.apiUrl}download?file=${routePdf}`;
    const harcodeRoute =
      'http://10.108.210.78:5000/api/bills/download?file=C:\\Users\\eduardo.jaramillo\\Documents\\dev\\Pruebas SIR\\0112202301176816465000120010030000009410000094118.pdf';

    return this.http.get(harcodeRoute, { responseType: 'blob' }).pipe(
      map((data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        return url;
      }),
      catchError((err) => {
        return throwError(() => new Error('No se pudo cargar el archivo PDF'));
      })
    );
  }
}
