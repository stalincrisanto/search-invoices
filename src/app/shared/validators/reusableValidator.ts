import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  protected errorMessages: { [key: string]: (control: FormControl) => string } =
    {
      required: () => 'Este campo es obligatorio',
    };

  getErrorMessage(control: FormControl): string | null {
    const errorKey = Object.keys(control.errors || {}).find(
      (key) => this.errorMessages[key]
    );
    return errorKey ? this.errorMessages[errorKey](control) : null;
  }
}
