import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BreakpointTypes, CssGroup, CssValue} from "../css-group.model";
import {HelperService} from "../helper.service";

@Component({
  selector: 'app-css-group',
  templateUrl: './css-group.component.html',
  styleUrls: ['./css-group.component.scss']
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
    const name = HelperService.buildName(property.key, this.cssGroup.name, breakpoint);

    localStorage.setItem(name, property.value.current);
    this.eventUpdate.emit({key: name, value: property.value.current})
    console.log(name, property, this.cssGroup)
  }

  unsorted() {
    return 0;
  }


}
