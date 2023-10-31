import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColorsEnum } from '@src/models/colors.enum';

@Component({
  selector: 'app-select-flex-direction',
  templateUrl: './select-flex-direction.component.html',
  styleUrls: ['./select-flex-direction.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectFlexDirectionComponent),
    multi: true
  }]
})
export class SelectFlexDirectionComponent implements ControlValueAccessor {
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
