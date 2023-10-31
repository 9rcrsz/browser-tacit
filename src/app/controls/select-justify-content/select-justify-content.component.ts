import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColorsEnum } from '@src/models/colors.enum';

@Component({
  selector: 'app-select-justify-content',
  templateUrl: './select-justify-content.component.html',
  styleUrls: ['./select-justify-content.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectJustifyContentComponent),
    multi: true
  }]
})
export class SelectJustifyContentComponent implements ControlValueAccessor {
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
