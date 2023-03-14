import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CssGroup } from "@app/models/css-group.model";
import { BreakpointTypes } from "@app/models/breakpoint-types.enum";
import { CssValue } from "@app/models/css-value.model";
import { CssGroupsService } from '@app/store/state/css-groups.service';
import { CssPropertyTypes } from '@app/models/css-propert-types.enum';
import { CssGroupsStore } from '@app/store/state/css-groups.store';
import { CssGroupsQuery } from '@app/store/state/css-groups.query';

@Component({
  selector: 'app-css-group',
  templateUrl: './css-group.component.html',
  styleUrls: ['./css-group.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssGroupComponent implements OnInit {
  @Output() eventUpdate = new EventEmitter<{ key: string, value: string }>();
  @Output() eventChildOppened = new EventEmitter<{ name: string, toggle: boolean }>();
  @Input() cssGroup!: CssGroup;
  breakpointTypes = BreakpointTypes;
  toggle: { [key: string]: boolean } = {};
  childOppenedMap: Map<string, boolean> = new Map();

  constructor(
    protected cssGroupsService: CssGroupsService,
    protected cssGroupsStore: CssGroupsStore,
    public cssGroupsQuery: CssGroupsQuery) {
  }

  ngOnInit(): void {
    for (let breakpointTypesKey in BreakpointTypes) {
      this.toggle[breakpointTypesKey] = false;

      if (breakpointTypesKey === BreakpointTypes.general) {
        this.toggle[breakpointTypesKey] = true;
      }
    }
  }

  onChanged(property: { key: string, value: CssValue }, breakpoint: BreakpointTypes) {
    this.cssGroupsStore.update(this.cssGroup.name, (q: CssGroup) => {
      const tmp = JSON.parse(JSON.stringify(q))
      q.bps[breakpoint][property.key].current = '222';
      console.log(5, tmp);
      return q;
    });

    this.cssGroup.template = null;
    localStorage.setItem(property.value.name, property.value.current);
    this.eventUpdate.emit({ key: property.value.name, value: property.value.current })
    console.log(property.value.name, property, this.cssGroup)
  }

  childToggle(name: string, toggle: boolean): void {
    if (toggle) {
      this.childOppenedMap.set(name, toggle);
    } else {
      this.childOppenedMap.delete(name);
    }

    this.cssGroupsService.update(this.cssGroup.name, { disabled: !!this.childOppenedMap.size });
  }

  trackByName(index: number, cssGroup: CssGroup) {
    return cssGroup.name;
  }

  unsorted() {
    return 0;
  }
}
