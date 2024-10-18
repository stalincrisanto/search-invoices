import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private errorMessages: { [key: string]: (control: FormControl) => string } = {
    required: () => 'Este campo es obligatorio',
    // minlength: (control) => `Debe tener al menos ${control.getError('minlength').requiredLength} caracteres`,
    // maxlength: (control) => `Debe tener menos de ${control.getError('maxlength').requiredLength} caracteres`,
    // email: () => 'Debe ser un email válido',
    // pattern: () => 'El formato es inválido',
    // cardIdLengthValidator: (control) => control.getError('cardIdLengthValidator')
    cardIdLengthValidator: (control) => 'Longitud incorrecta'
    // Agrega más validaciones aquí si es necesario
  };

  getErrorMessage(control: FormControl): string | null {
    // Busca el primer error en el control y retorna su mensaje correspondiente
    const errorKey = Object.keys(control.errors || {}).find(key => this.errorMessages[key]);
    return errorKey ? this.errorMessages[errorKey](control) : null;
  }
}
