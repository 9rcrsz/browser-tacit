import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CssGroup} from "../css-group.model";

@Component({
  selector: 'app-css-group',
  templateUrl: './css-group.component.html',
  styleUrls: ['./css-group.component.scss']
})
export class CssGroupComponent implements OnInit {
  @Output() eventUpdate = new EventEmitter<{ key: string, value: string }>();
  @Input() cssGroup!: CssGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

  onChanged(property: any, breakpoint: string) {
    const name = '--' + property.key + '_' + this.cssGroup.name + (breakpoint === 'general' ? '' : '_' + breakpoint);

    localStorage.setItem(name, property.value);
    this.eventUpdate.emit({key: name, value: property.value})
    console.log(name, property, this.cssGroup)
  }

}
