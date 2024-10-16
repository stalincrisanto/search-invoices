import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
  ],
})
export class InputDateComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() datePickerId: string = '';

  value: Date | null = null;
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: Date | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValue(value: Date | null) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  handleInput(event: any) {
    console.log(event);
    const value = event.value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
