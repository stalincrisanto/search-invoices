import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  //TODO: add types to color and type from angular material docs
  // as interface that implements the class
  @Input() label: string = 'Botón';
  @Input() color: string = 'primary';
  @Input() type: string = 'submit';
  @Input() disabled: boolean = false;
}
