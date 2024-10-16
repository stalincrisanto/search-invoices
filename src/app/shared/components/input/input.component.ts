import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor{
  @Input() id: string = '';
  @Input() formControlName: string = '';
  @Input() label: string = 'Campo';
  @Input() required: boolean = false;
  @Input() placeholder: string = 'Ingresar un valor';
  @Input() inputmode: string = 'numeric';

  value: any;
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValue(value: any) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  // Método para manejar el evento de entrada
  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.setValue(input.value);
  }
}