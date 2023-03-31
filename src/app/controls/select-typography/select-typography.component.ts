import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TypographyEnum } from '@app/models/typography.enum';

@Component({
  selector: 'app-select-typography',
  templateUrl: './select-typography.component.html',
  styleUrls: ['./select-typography.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectTypographyComponent),
    multi: true
  }]
})
export class SelectTypographyComponent implements ControlValueAccessor {
  @Input() placeholder!: string;
  typographyEnum = TypographyEnum;

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
