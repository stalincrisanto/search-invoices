import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchService } from '../../services/search.service';
import { SearchParams } from '../../../../shared/models/search.model';
import { Invoice } from '../../../../shared/models/invoice.model';
import { cardIdLengthValidator } from '../../../../validators/id.validator';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent {
  @Output() searchResults = new EventEmitter<Invoice[] | null>();

  dataForm: FormGroup;

  dateStartDefault = new FormControl(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  dateEndDefault = new FormControl(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  );


  constructor(
    private fb: FormBuilder,
    private searchInvoices: SearchService,
    private snackbar: MatSnackBar
  ) {
    this.dataForm = this.fb.group({
      cardId: ['', [Validators.required, cardIdLengthValidator()]],
      dateStart: [this.dateStartDefault.value],
      dateEnd: [this.dateEndDefault.value],
    });
  }

  onSubmit() {
    if (this.dataForm.valid) {
      // console.log(this.dataForm.value);
      this.searchInvoices
        .getInvoicesOfPerson(this.dataForm.value as SearchParams)
        .subscribe((invoices) => {
          if (invoices) {
            // console.log(invoices);
            this.searchResults.emit(invoices);
            // this.invoices = invoices;
            // this.formSubmitted.emit(this.dataForm.value);
            // this.personName = invoices?.[0].accountRazon!;
          } else {
            this.snackbar.open('No se encontró información', '', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-error'],
            });
            // this.invoices = null;
            // this.personName = null;
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
    // this.personName = null;
    // this.invoices = null;
  }
}
