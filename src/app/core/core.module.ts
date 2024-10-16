import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchService } from '../services/search.service';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, MatToolbarModule],
  exports: [HeaderComponent, FooterComponent],
  providers: [SearchService],
})
export class CoreModule {}
