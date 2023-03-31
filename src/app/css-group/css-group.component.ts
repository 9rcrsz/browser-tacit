import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CssGroup } from "@app/models/css-group.model";
import { BreakpointTypes } from "@app/models/breakpoint-types.enum";
import { CssValue } from "@app/models/css-value.model";
import { CssGroupsService } from '@app/store/state/css-groups.service';
import { CssGroupsQuery } from '@app/store/state/css-groups.query';
import { ChromeService } from '@app/services/chrome.service';
import { take } from 'rxjs/operators';
import { TemplatesService } from '@app/services/templates.service';
import { TypographyPropertiesEnum } from '@app/models/typography-properties.enum';
import { buildTypographyCssName } from '@app/services/helper.service';
import { TypographyEnum } from '@app/models/typography.enum';

@Component({
  selector: 'app-css-group',
  templateUrl: './css-group.component.html',
  styleUrls: ['./css-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssGroupComponent implements OnInit, OnChanges {
  @Input() cssGroup!: CssGroup;
  breakpointTypes = BreakpointTypes;
  toggle: { [key: string]: boolean } = {};
  typography?: string;
  typographyPropertiesEnum = TypographyPropertiesEnum;
  childOppenedMap: Map<string, boolean> = new Map();

  constructor(
    protected cssGroupsService: CssGroupsService,
    protected chromeService: ChromeService,
    protected templatesService: TemplatesService,
    public cssGroupsQuery: CssGroupsQuery) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cssGroup && this.cssGroup) {
      this.cssGroup = JSON.parse(JSON.stringify(this.cssGroup));

      const fontFamilyProperty = this.cssGroup.bps[BreakpointTypes.general][TypographyPropertiesEnum['font-family']];
      if (fontFamilyProperty) {
        for (const i in TypographyEnum) {
          if (fontFamilyProperty.current.indexOf(i) > -1) {
            this.typography = i;
            break;
          }
        }
      }
    }
  }

  ngOnInit(): void {
    for (let breakpointTypesKey in BreakpointTypes) {
      this.toggle[breakpointTypesKey] = false;

      if (breakpointTypesKey === BreakpointTypes.general) {
        this.toggle[breakpointTypesKey] = true;
      }
    }
  }

  changeTypography(e: any) {
    for (const breakpoint in this.cssGroup.bps) {
      for (const property in this.cssGroup.bps[breakpoint]) {
        if (!(property in TypographyPropertiesEnum)) {
          continue;
        }

        const cssValue = this.cssGroup.bps[breakpoint][property];
        if (e !== 'unset') {
          cssValue.current = 'var(' + buildTypographyCssName(property, e, breakpoint as BreakpointTypes) + ')'
          localStorage.setItem(cssValue.name, cssValue.current);
        } else {
          cssValue.current = cssValue.default;
          localStorage.removeItem(cssValue.name);
        }

        this.chromeService.send({ type: 'set-variables', variables: [{ key: cssValue.name, value: cssValue.current }] });
      }
    }

    this.cssGroup.template = null;
    this.cssGroupsService.update(this.cssGroup.name, this.cssGroup);
  }

  onChanged(property: { key: string, value: CssValue }, breakpoint: BreakpointTypes) {
    this.cssGroup.bps[breakpoint][property.key].current = property.value.current;
    this.cssGroup.template = null;
    this.cssGroupsService.update(this.cssGroup.name, this.cssGroup);

    localStorage.setItem(property.value.name, property.value.current);
    this.chromeService.send({ type: 'set-variables', variables: [{ key: property.value.name, value: property.value.current }] });

    console.log(property.value.name, property, this.cssGroup)
  }

  templateSelected(templateName: string | null) {
    if (templateName !== null) {
      this.templatesService.templates.get(templateName)!
        .pipe(take(1))
        .subscribe(data => {
          this.cssGroupsService.setCascadeTemplate(this.cssGroup, templateName, data);
        });
    } else {
      this.cssGroupsService.setCascadeTemplate(this.cssGroup, null, new Map());
    }
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
