import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  invoices: Invoice[] = [];
  personName: string = '';

  constructor(private fb: FormBuilder, private searchService: SearchService) {
    this.dataForm = this.fb.group(
      {
        cardId: ['', [Validators.required, cardIdLengthValidator()]],
        dateStart: [new Date(), [Validators.required]],
        dateEnd: ['', [Validators.required]],
      }
    );
  }

  onSubmit() {
    if (this.dataForm.valid) {
      this.searchService
        .getInvoicesOfPerson(this.dataForm.value as SearchParams)
        .subscribe((invoices) => {
          this.invoices = invoices;
          this.personName = invoices[0].accountRazon;
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
}
