import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColorsEnum } from '@app/models/colors.enum';

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.component.html',
  styleUrls: ['./select-color.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectColorComponent),
    multi: true
  }]
})
export class SelectColorComponent implements ControlValueAccessor {
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
