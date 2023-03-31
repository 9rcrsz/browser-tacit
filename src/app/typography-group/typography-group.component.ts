import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CssGroup } from "@app/models/css-group.model";
import { BreakpointTypes } from "@app/models/breakpoint-types.enum";
import { CssGroupsQuery } from '@app/store/state/css-groups.query';
import { ChromeService } from '@app/services/chrome.service';
import { take } from 'rxjs/operators';
import { TemplatesService } from '@app/services/templates.service';
import { TypographyService } from '@app/store/state/typography.service';
import { buildTypographyCssName } from '@app/services/helper.service';
import { Typography } from '@app/models/typography.model';

@Component({
  selector: 'app-typography-group',
  templateUrl: './typography-group.component.html',
  styleUrls: ['./typography-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssGroupComponent implements OnInit, OnChanges {
  @Input() typography!: Typography;
  breakpointTypes = BreakpointTypes;
  toggle: { [key: string]: boolean } = {};

  constructor(
    protected typographyService: TypographyService,
    protected chromeService: ChromeService,
    protected templatesService: TemplatesService,
    public cssGroupsQuery: CssGroupsQuery) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.typography && this.typography) {
      this.typography = JSON.parse(JSON.stringify(this.typography));
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

  onChanged(property: { key: string, value: string }, breakpoint: BreakpointTypes) {
    this.typography.bps[breakpoint][property.key] = property.value;
    this.typography.template = null;
    this.typographyService.update(this.typography.name, this.typography);

    const cssName = buildTypographyCssName(property.key, this.typography.name, breakpoint);
    localStorage.setItem(cssName, property.value);
    this.chromeService.send({ type: 'set-variables', variables: [{ key: cssName, value: property.value }] });
  }

  templateSelected(templateName: string | null) {
    if (templateName !== null) {
      this.templatesService.templates.get(templateName)!
        .pipe(take(1))
        .subscribe(data => {
          this.typographyService.setCascadeTemplate(this.typography, templateName, data);
        });
    } else {
      this.typographyService.setCascadeTemplate(this.typography, null, new Map());
    }
  }

  trackByName(index: number, cssGroup: CssGroup) {
    return cssGroup.name;
  }

  unsorted() {
    return 0;
  }
}
