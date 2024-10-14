import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const cardIdLengthValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const cardId = control.value as string;
    if (cardId && cardId.length === 10) {
      return null;
    }
    return { cardIdLengthValidator: true };
  };
};