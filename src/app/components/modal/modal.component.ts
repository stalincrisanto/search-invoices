import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  sanitizedPdfUrl: SafeResourceUrl = 'https://main-graphql-media-mediabucket-bucketd7feb781-12j7qtewbafu9.s3.eu-west-1.amazonaws.com/Presurizados%20con%20c%C3%A1mara.pdf';

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public pdfUrl: string,
    private sanitizer: DomSanitizer
  ) {
    this.sanitizedPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  }
}
