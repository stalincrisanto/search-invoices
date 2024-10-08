import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';
import { Invoice, Person, SearchParams } from 'src/app/types/person.type';
import { PERSONS_DATA } from '../utils/data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  dataForm: FormGroup;
  invoices: Invoice[] = [];
  person: Person | null = null;

  constructor(private fb: FormBuilder, private searchService: SearchService) {
    this.dataForm = this.fb.group({
      cardId: ['', Validators.required],
      dateStart: [''],
      dateEnd: [''],
    });
  }

  onSubmit() {
    if (this.dataForm.valid) {
      this.searchService
        .getInvoicesOfPerson(this.dataForm.value as SearchParams)
        .subscribe((invoices) => {
          this.invoices = invoices;
          this.person =
            PERSONS_DATA.find(
              ({ cardId }) => cardId === this.dataForm.get('cardId')?.value
            ) || null;
        });
    }
  }
}
