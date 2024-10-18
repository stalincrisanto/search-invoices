import { Injectable } from '@angular/core';
import { ValidationService } from 'src/app/shared/validators/reusableValidator';

@Injectable({
  providedIn: 'root',
})
export class InputValidationService extends ValidationService {
  constructor() {
    super();
    this.errorMessages = {
      ...this.errorMessages,
      cardIdLengthValidator: (control) =>
        'El número de cédula debe tener 10 dígitos',
    };
  }
}
