import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BreakpointTypes, CssGroup, CssValue} from "../css-group.model";

@Component({
  selector: 'app-css-group',
  templateUrl: './css-group.component.html',
  styleUrls: ['./css-group.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssGroupComponent implements OnInit {
  @Output() eventUpdate = new EventEmitter<{ key: string, value: string }>();
  @Input() cssGroup!: CssGroup;
  breakpointTypes = BreakpointTypes;

  constructor() {
  }

  ngOnInit(): void {
  }

  onChanged(property: { key: string, value: CssValue }, breakpoint: BreakpointTypes) {
    localStorage.setItem(property.value.name, property.value.current);
    this.eventUpdate.emit({key: property.value.name, value: property.value.current})
    console.log(property.value.name, property, this.cssGroup)
  }

  unsorted() {
    return 0;
  }


}
