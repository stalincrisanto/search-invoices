import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchService } from 'src/app/services/search.service';
import { Invoice, SearchParams } from 'src/app/types/invoice.type';
import { cardIdLengthValidator } from 'src/app/validators/id.validator';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  dataForm: FormGroup;
  invoices: Invoice[] | null = null;
  personName: string | null = null;

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
    private snackbar: MatSnackBar
  ) {
    this.dataForm = this.fb.group({
      cardId: ['', [Validators.required, cardIdLengthValidator()]],
      dateStart: ['', []],
      dateEnd: ['', []],
    });
  }

  onSubmit() {
    if (this.dataForm.valid) {
      this.searchService
        .getInvoicesOfPerson(this.dataForm.value as SearchParams)
        .subscribe((invoices) => {
          if (invoices) {
            console.log("invoices", invoices);
            this.invoices = invoices;
            this.personName = invoices?.[0].account_razon!;
          } else {
            this.snackbar.open('No se encontró información', '', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-error'],
            });
            this.invoices = null;
            this.personName = null;
          }
        });
    }
  }

  preventNonNumeric(event: KeyboardEvent) {
    const key = event.key;
    const controlKeys = [
      'Backspace',
      'Tab',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Home',
      'End',
    ];

    if (controlKeys.includes(key)) {
      return;
    }

    if (!/^[0-9]$/.test(key)) {
      event.preventDefault();
    }
  }

  cleanFields() {
    this.personName = null;
    this.invoices = null;
  }
}
