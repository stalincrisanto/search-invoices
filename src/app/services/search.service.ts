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
    console.log("apuUrl", this.apiUrl);
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

  // getInvoicesOfPerson({
  //   cardId,
  //   dateStart,
  //   dateEnd,
  // }: SearchParams): Observable<Invoice[] | null> {
  //   const urlOnlyCardId = `${this.apiUrl}?identificacion=${cardId}`;
  //   const urlWithDates = `${
  //     this.apiUrl
  //   }?identificacion=${cardId}&fecha_inicio=${dayjs(dateStart)
  //     .startOf('day')
  //     .format('YYYY-MM-DD HH:mm:ss')
  //     .toString()}&fecha_fin=${dayjs(dateEnd)
  //     .endOf('day')
  //     .format('YYYY-MM-DD HH:mm:ss')
  //     .toString()}`;

  //   const invoicesRequest =
  //     dateStart && dateEnd
  //       ? this.http.get<Invoice[]>(urlWithDates)
  //       : this.http.get<Invoice[]>(urlOnlyCardId);

  //   return invoicesRequest.pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error al buscar el cliente', error);
  //       return of(null);
  //     }),
  //     map((invoices) => (invoices && invoices.length > 0 ? invoices : null))
  //   );
  // }
}
