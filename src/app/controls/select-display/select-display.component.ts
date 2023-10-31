import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColorsEnum } from '@src/models/colors.enum';

@Component({
  selector: 'app-select-display',
  templateUrl: './select-display.component.html',
  styleUrls: ['./select-display.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectDisplayComponent),
    multi: true
  }]
})
export class SelectDisplayComponent implements ControlValueAccessor {
  @Input() placeholder!: string;
  colorsEnum = ColorsEnum;

  propagateChange: any;
  value?: string;

  onChanged(value: string) {
    this.propagateChange(value);
  }

  writeValue(data: any): void {
    this.value = data;
  }

  registerOnChange(data: any): void {
    this.propagateChange = data;
  }

  registerOnTouched(data: any): void {
  }
}
