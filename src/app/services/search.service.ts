import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Invoice, Person, SearchParams } from '../types/person.type';
import { INVOICES_DATA, PERSONS_DATA } from '../components/utils/data';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = 'http://localhost:5125/api/clients';

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
      ({ personId }) => personId === cardId
    );
    return invoicesOfPerson.length != 0 ? of(invoicesOfPerson) : of(null);
  }
}
