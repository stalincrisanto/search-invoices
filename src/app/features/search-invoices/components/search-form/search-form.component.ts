import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  dataForm: FormGroup;
  // invoices: Invoice[] | null = null;
  personName: string | null = null;

  constructor(
    private fb: FormBuilder,
    // private searchService: SearchService,
    private snackbar: MatSnackBar
  ) {
    this.dataForm = this.fb.group({
      // cardId: ['', [Validators.required, cardIdLengthValidator()]],
      // dateStart: [new Date(), [Validators.required]],
      // dateEnd: ['', [Validators.required]],

      cardId: ['', []],
      dateStart: ['',[]],
      dateEnd: ['', []],
    });
  }

  onSubmit() {
    // if (this.dataForm.valid) {
    //   console.log(this.dataForm.value)
    //   this.searchService
    //     .getInvoicesOfPerson(this.dataForm.value as SearchParams)
    //     .subscribe((invoices) => {
    //       if (invoices) {
    //         this.invoices = invoices;
    //         this.personName = invoices?.[0].accountRazon!;
    //       } else {
    //         this.snackbar.open('No se encontró información', '', {
    //           duration: 3000,
    //           horizontalPosition: 'end',
    //           verticalPosition: 'top',
    //           panelClass: ['snackbar-error'],
    //         });
    //         this.invoices = null;
    //         this.personName = null;
    //       }
    //     });
    // }
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