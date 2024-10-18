import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Invoice, SearchParams } from '../types/invoice.type';
import { INVOICES_DATA } from '../data/data';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl =
    'http://127.0.0.1:5000/api/bills?identificacion=12345&fecha_inicio=2023-01-01&fecha_fin=2023-01-31';

  constructor(private http: HttpClient) {}

  // getInvoicesOfPerson(input: SearchParams): Observable<Invoice | null> {
  //   const url = `${this.apiUrl}/`;
  //   const data: Invoice[] = INVOICES_DATA;
  //   // return this.http.get<SearchParams>(url).pipe(
  //   //   catchError((error: HttpErrorResponse) => {
  //   //     console.error('Error al buscar el cliente', error);
  //   //     return of(null);
  //   //   })
  //   // );
  //   const invoices = this.http.get<Invoice>("");
  //   return of(data.length > 0 ? data : null);
  // }

  getInvoicesOfPerson(input: SearchParams): Observable<Invoice[] | null> {
    const { cardId } = input;
    const invoicesOfPerson = INVOICES_DATA.filter(
      ({ account_fiscal_id }) => account_fiscal_id === cardId
    );
    console.log("en el servicio", invoicesOfPerson);
    return invoicesOfPerson.length != 0 ? of(invoicesOfPerson) : of(null);
  }
}
