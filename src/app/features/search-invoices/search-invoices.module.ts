import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchInvoicesComponent } from './search-invoices.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SearchFormComponent,
    SearchResultComponent,
    SearchInvoicesComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  exports: [SearchInvoicesComponent],
})
export class SearchInvoicesModule {}
