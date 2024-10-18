import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError, map } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Invoice, SearchParams } from '../types/invoice.type';
import { INVOICES_DATA } from '../data/data';
import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = 'http://127.0.0.1:5000/api/bills?';

  constructor(private http: HttpClient) {}

  getInvoicesOfPerson(input: SearchParams): Observable<Invoice[] | null> {
    const { cardId, dateStart, dateEnd } = input;
    const urlOnlyCardId = `${this.apiUrl}identificacion=${cardId}`;
    const urlWithDates = `${this.apiUrl}identificacion=${cardId}&fecha_inicio=${dateStart}&fecha_fin=${dateEnd}`;
  
    const invoicesRequest = dateStart && dateEnd
      ? this.http.get<Invoice[]>(urlWithDates)
      : this.http.get<Invoice[]>(urlOnlyCardId);
  
    return invoicesRequest.pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al buscar el cliente', error);
        return of(null);
      }),
      map((invoices) => (invoices && invoices.length > 0 ? invoices : null))
    );
  }

  // getInvoicesOfPerson(input: SearchParams): Observable<Invoice[] | null> {
  //   const { cardId, dateStart, dateEnd } = input;
  //   const invoicesOfPerson = INVOICES_DATA.filter(
  //     ({ account_fiscal_id, chs_data_dat }) =>
  //       dateStart && dateEnd ? '' : account_fiscal_id === cardId
  //   );
  //   console.log('en el servicio', invoicesOfPerson);
  //   return invoicesOfPerson.length != 0 ? of(invoicesOfPerson) : of(null);
  // }

  // getInvoicesOfPerson(input: SearchParams): Observable<Invoice[] | null> {
  //   const { cardId, dateStart, dateEnd } = input;

  //   const invoicesOfPerson = INVOICES_DATA.filter(({ account_fiscal_id, chs_data_dat }) => {
  //     const chsDate = dayjs(chs_data_dat).startOf('day');
  //     const isDateInRange = dateStart && dateEnd
  //       ? chsDate.isBetween(dayjs(dateStart).startOf('day'), dayjs(dateEnd).endOf('day'), null, '[]')
  //       : true;
  //     return account_fiscal_id === cardId && isDateInRange;
  //   });
  //   return invoicesOfPerson.length !== 0 ? of(invoicesOfPerson) : of(null);
  // }
}
